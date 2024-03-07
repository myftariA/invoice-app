import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Check, ChevronsUpDown, XIcon } from "lucide-react";
import { FaFileInvoice, FaPlus } from "react-icons/fa";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from './components/ui/label';
import { Textarea } from './components/ui/textarea';
import { Customer, Item, InvoiceLine, InvoiceDTO } from './Types';
import { toast } from 'sonner';
import { Input } from './components/ui/input';
import { useUserContext } from './UserContext';

const Invoices: React.FC = () => {
    const { user } = useUserContext();
    const getAllCustomers = async () => {
        try {
            const [customers, items] = await Promise.all([
                axios.get<Customer[]>('/api/Customers'),
                axios.get<Item[]>('/api/Items'),
            ]);
            setCustomers(customers.data as Customer[]);
            setAllItems(items.data as Item[]);
        } catch (error: any) {
            toast.error('Error fetching data', {
                description: error?.message,
                cancel: {
                    label: 'Close'
                }
            });
        }
    };

    const [customers, setCustomers] = useState<Customer[]>([]);
    const [openCustomersList, setOpenCustomersList] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

    const [openItemsList, setOpenItemsList] = useState(false);
    const [itemsList, setItemsList] = useState<InvoiceLine[]>([]);
    const [allItems, setAllItems] = useState<Item[]>([]);

    const invoiceNrRef = useRef<HTMLInputElement>(null);
    const subtotalRef = useRef<HTMLLabelElement>(null);
    const vatRef = useRef<HTMLLabelElement>(null);
    const totalRef = useRef<HTMLLabelElement>(null);
    const notesRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => { getAllCustomers() }, []);

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>, itemId: number) => {
        const newItems = itemsList.map((item) =>
            item.itemId === itemId ? { ...item, quantity: parseInt(e.target.value, 10) || 0 } : item
        );
        setItemsList(newItems);
    };
    const generateInvoice = async function () {
        if (!invoiceNrRef.current?.value) return toast.warning('Please enter an invoice number ', {
            cancel: {
                label: 'Close'
            }
        });
        if (!selectedCustomer) return toast.warning('You must select a customer before continuing', {
            cancel: {
                label: 'Close'
            }
        });
        const invoiceDto: InvoiceDTO = {
            invoiceDate: new Date().toISOString(),
            invoiceNumber: `ARM-${invoiceNrRef.current.value}`,
            customerId: selectedCustomer.id,
            totalAmount: totalRef.current?.textContent ? +totalRef.current?.textContent : 0,
            totalVatAmount: vatRef.current?.textContent ? +vatRef.current?.textContent : 0,
            totalDiscountAmount: 0,
            isPaid: false,
            notes: notesRef.current?.value,
            user: user?.username,
            invoiceLines: itemsList,
        }
        const invoiceResp = await axios.post<InvoiceDTO>('/api/Invoices', invoiceDto);
        console.log(invoiceResp);

    }
    return (
        <div className="flex flex-col w-full">
            <div className='flex items-end justify-start gap-2 mb-6'>
                <div className='flex items-center gap-[.5rem]'>
                    <Label className='text-md font-bold'>Date:</Label>
                    <Label>{(new Date().toDateString())}</Label>
                </div>
                <div className='flex items-center gap-[.5rem]'>
                    <Label htmlFor='invoiceNr' className='text-md  font-bold'>Invoice Number:</Label>
                    <div>
                        ARM-<input id='invoiceNr' type='text' className='border-[1px] border-black rounded-md capitalize focus:outline-none' ref={invoiceNrRef} ></input>
                    </div>
                </div>
            </div>
            <div id='generalInfo' className="grid sm:grid-cols-2 grid-cols-1 gap-2 w-full">
                <div>
                    <h2 className='base-mb font-bold text-lg'>From</h2>
                    <div id='billFrom' className='border'>
                        <div className='break-word h-[35px] border-b base-p'>
                            <label className='mr-3 font-bold'>Bussines: </label>
                            <label className='text-sm text-gray-500 dark:text-gray-300'>A.M Invoicing</label>
                        </div>
                        <div className='break-word h-[35px] border-b base-p'>
                            <label className='mr-3 font-bold'>Email: </label>
                            <label className='text-sm text-gray-500 dark:text-gray-300 '>armandomyftarii@gmail.com</label></div>
                        <div className='break-word h-[35px] border-b base-p'>
                            <label className='mr-3 font-bold'>Phone Number: </label>
                            <label className='text-sm text-gray-500 dark:text-gray-300'>+355 69 487 0009</label></div>
                        <div className='break-word h-[35px] base-p'>
                            <label className='mr-3 font-bold'>Address: </label>
                            <label className='text-sm text-gray-500 dark:text-gray-300'>Unaza e Re,  Tirane, Albania</label></div>
                    </div>
                </div>
                <div>
                    <h2 className='base-mb font-bold text-lg'>Bill to</h2>
                    <div id='billTo' className='border'>
                        <div className='break-word h-[35px] border-b base-p flex items-center'>
                            <label className='mr-3 font-bold'>Customer: </label>
                            <Popover open={openCustomersList} onOpenChange={setOpenCustomersList}>
                                <PopoverTrigger className='w-[auto]' asChild>
                                    <Button
                                        variant="outline"
                                        size='base'
                                        role="combobox"
                                        aria-expanded={openCustomersList}
                                        className="justify-between bg-slate-100 overflow-clip text-gray-500 dark:text-white"
                                    >
                                        {selectedCustomer?.name || "Select customer ... "}
                                        <ChevronsUpDown className="ml-[.5rem] h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[auto] p-0">
                                    <ScrollArea className='h-[200px] sm:h-[350px] rounded-md border'>
                                        <Command className=' '>
                                            <CommandInput placeholder="Search customer..." />
                                            <CommandEmpty>No customer found.</CommandEmpty>
                                            <CommandGroup>
                                                {customers.map((customer) => (
                                                    <CommandItem
                                                        key={customer.id}
                                                        value={customer.id.toString()}
                                                        onSelect={(currentValue) => {
                                                            const val = (+currentValue === selectedCustomer?.id) ? null
                                                                : customers.find(cust => cust.id === +currentValue);
                                                            console.log(val);
                                                            setSelectedCustomer(val ?? null);
                                                            setOpenCustomersList(false)
                                                        }}
                                                        className='p-3'
                                                    >
                                                        <Check
                                                            className={selectedCustomer?.id === customer.id ? "opacity-100" : "opacity-0"}
                                                        />
                                                        {customer.name}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </Command>
                                    </ScrollArea>
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className='break-word h-[35px] border-b  base-p'>
                            <label className='mr-3 font-bold'>Email: </label>
                            <label className='text-sm text-gray-500 dark:text-gray-300 '>{selectedCustomer?.email}</label></div>
                        <div className='break-word h-[35px] border-b base-p'>
                            <label className='mr-3 font-bold'>Phone Number: </label>
                            <label className='text-sm text-gray-500 dark:text-gray-300'>{selectedCustomer?.phone}</label></div>
                        <div className='break-word h-[35px] base-p'>
                            <label className='mr-3 font-bold'>Address: </label>
                            <label className='text-sm text-gray-500 dark:text-gray-300'>{selectedCustomer?.address}</label></div>
                    </div>
                </div>
            </div >
            <div id='invoiceEntries' className=' mt-10 p-[.5rem]'>
                <div className='flex items-center justify-center text-lg opacity-50'>
                    Invoice Items
                </div>
                <Table >
                    <TableCaption className='mt-10'>
                        <Popover open={openItemsList} onOpenChange={setOpenItemsList}>
                            <PopoverTrigger className='w-[auto]' asChild>
                                <Button className='flex items-center gap-[.25rem] float-left focus:outline-none' aria-expanded={openItemsList} size='sm'>New Item
                                    <FaPlus ></FaPlus></Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[auto] p-0">
                                <ScrollArea className='h-[200px] sm:h-[350px] rounded-md border'>
                                    <Command className=' '>
                                        <CommandInput placeholder="Search items..." />
                                        <CommandEmpty>No item found.</CommandEmpty>
                                        <CommandGroup>
                                            {allItems.map((item) => (
                                                <CommandItem
                                                    key={item.id}
                                                    value={item.id.toString()}
                                                    onSelect={(current) => {
                                                        setOpenItemsList(false);
                                                        const itemExists = itemsList.findIndex(el => el.itemId === +current);
                                                        if (itemExists !== -1) {
                                                            const currentItems = [...itemsList];
                                                            currentItems[itemExists].quantity += 1;
                                                            setItemsList(currentItems);
                                                            return;
                                                        }
                                                        const val = allItems.find(el => el.id === +current);
                                                        if (val) {
                                                            setItemsList(prevItems => [...prevItems, {
                                                                itemId: val.id,
                                                                itemName: val.name,
                                                                itemCode: val.code,
                                                                vatRate: val.vatRate,
                                                                quantity: val.quantity ?? 1,
                                                                uom: val.uom,
                                                                unitPrice: val.price,
                                                                discountPercent: 0,
                                                                notes: ''
                                                            }]);
                                                        }
                                                    }}
                                                    className='p-3'
                                                >
                                                    {item.name}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </Command>
                                </ScrollArea>
                            </PopoverContent>
                        </Popover>
                    </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Code</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead className="text-left">Unit Price</TableHead>
                            <TableHead className="text-left">Total</TableHead>
                            <TableHead className="text-right">Vat</TableHead>
                            <TableHead className="text-right">Total With Vat</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {itemsList.length > 0 && itemsList.map((item, index) => (
                            <TableRow key={item.itemId}>
                                <TableCell className="font-medium">{item.itemCode}</TableCell>
                                <TableCell>{item.itemName}</TableCell>
                                <TableCell >
                                    <Input className='w-[50px] p-0 h-[30px] border-0 text-center focus:outline-none dark:bg-transparent' type='number'
                                        value={item.quantity ?? 1} min={1} onChange={(e) => {
                                            handleQuantityChange(e, item.itemId)
                                        }}></Input>
                                </TableCell>
                                <TableCell className="text-left">{item.unitPrice}</TableCell>
                                <TableCell>{(item.quantity * item.unitPrice).toFixed(2)}</TableCell>
                                <TableCell className="text-right">{item.vatRate > 0 ? ((item.quantity * item.unitPrice) * item.vatRate).toFixed(2) : ''}</TableCell>
                                <TableCell className="text-right">{((item.quantity * item.unitPrice) + ((item.quantity * item.unitPrice) * item.vatRate)).toFixed(2)}</TableCell>
                                <TableCell className='size-1'>
                                    <XIcon className='size-1 cursor-pointer' onClick={(...args) => {
                                        if (item.itemId) {
                                            console.log(args);
                                            const items = [...itemsList];
                                            items.splice(index, 1);
                                            setItemsList(items);
                                        }
                                    }}></XIcon>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div id='totalInfo' className='w-full flex items-center justify-between border-none mt-10'>
                    <div className="grid gap-[.5rem] w-2/3">
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea className='dark:bg-slate-800/50' placeholder="Write invoice notes here." id="notes" ref={notesRef} />
                    </div>
                    <div className='rounded-md mt-3 dark:bg-slate-800/50 border-2 dark:border-none'>
                        <div className='flex justify-between items-center'>
                            <Label className=' px-3 py-[.75rem]'>SubTotal</Label>
                            <Label className="text-right px-3 py-[.75rem]" ref={subtotalRef}>{(itemsList.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0)).toFixed(2)}</Label>
                        </div>
                        <div className='flex justify-between items-center'>
                            <Label className=' px-3 py-[.75rem]' >Vat</Label>
                            <Label className=" px-3 py-[.75rem] text-right" ref={vatRef}>{(itemsList.reduce((acc, item) => acc + ((item.quantity * item.unitPrice) * item.vatRate), 0)).toFixed(2)}</Label>
                        </div>
                        <div className='flex justify-between items-center'>
                            <Label className=' px-3 py-[.75rem]'>Total</Label>
                            <Label className="text-right  px-3 py-[.75rem]" ref={totalRef}>{(itemsList.reduce((acc, item) => acc + ((item.quantity * item.unitPrice) + ((item.quantity * item.unitPrice) * item.vatRate)), 0)).toFixed(2)}</Label>
                        </div>
                    </div>
                </div>
                <div id="sumbitButton" className='mt-10'>
                    <Button size='base' className='float-right flex gap-[.5rem]' onClick={generateInvoice}> Generate
                        <FaFileInvoice ></FaFileInvoice></Button>
                </div>
            </div>
        </div >
    )
}

export default Invoices;