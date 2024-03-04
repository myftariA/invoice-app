import React, { useState } from 'react';
import { Check, ChevronsUpDown, XIcon } from "lucide-react";
import { FaFileInvoice, FaPlus } from "react-icons/fa";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Textarea } from './components/ui/textarea';
import { cva } from 'class-variance-authority';

const Invoices: React.FC = () => {

    const [openCustomersList, setOpenCustomersList] = useState(false)
    const [selectedCustomer, setSelectedCustomer] = useState('')

    const [customers] = useState([
        {
            value: "iva",
            label: "Iva",
        },
        {
            value: "armando",
            label: "Armando",
        },
        {
            value: "test",
            label: "Test",
        },
        {
            value: "iva1",
            label: "Iva",
        },
        {
            value: "armando1",
            label: "Armando1",
        },
        {
            value: "test1",
            label: "Test",
        },
        {
            value: "iva2",
            label: "Iva",
        },
        {
            value: "armando2",
            label: "Armando2",
        },
        {
            value: "test2",
            label: "Test",
        },
        {
            value: "iva3",
            label: "Iva",
        },
        {
            value: "armando3",
            label: "Armando3",
        },
        {
            value: "test3",
            label: "Test",
        },
    ]);
    const [items, setItems] = useState([
        {
            id: 1,
            name: "Uje",
            code: "U001",
            price: "$20.00",
            vatRate: "0.2",
            quantity: ''
        }
    ]);
    function addNewItem() {
        console.log('new item added');
    }
    function deleteItem(itemId: number) {
        console.log('item deleted', itemId);
    }
    return (
        <div className="flex flex-col w-full">
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
                                        {selectedCustomer
                                            ? customers.find((customer) => customer.value === selectedCustomer)?.label
                                            : "Select customer ... "}
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
                                                        key={customer.value}
                                                        value={customer.value}
                                                        onSelect={(currentValue) => {
                                                            setSelectedCustomer(currentValue === selectedCustomer ? "" : currentValue)
                                                            setOpenCustomersList(false)
                                                        }}
                                                        className='p-3'
                                                    >
                                                        <Check
                                                            className={selectedCustomer === customer.value ? "opacity-100" : "opacity-0"}
                                                        />
                                                        {customer.label}
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
                            <label className='text-sm text-gray-500 dark:text-gray-300 '>armandomyftarii@gmail.com</label></div>
                        <div className='break-word h-[35px] border-b base-p'>
                            <label className='mr-3 font-bold'>Phone Number: </label>
                            <label className='text-sm text-gray-500 dark:text-gray-300'>+355 69 487 0009</label></div>
                        <div className='break-word h-[35px] base-p'>
                            <label className='mr-3 font-bold'>Address: </label>
                            <label className='text-sm text-gray-500 dark:text-gray-300'>Unaza e Re, Tirane, Albania</label></div>
                    </div>
                </div>
            </div >
            <div id='invoiceEntries' className=' mt-3 p-[.5rem]'>
                <div className='flex items-center'>
                    <TableCaption className='w-full text-lg p-3'>
                        Invoice Items
                    </TableCaption>
                </div>
                <Table >
                    <TableCaption>
                        <Button className='flex items-center gap-[.25rem] float-left focus:outline-none' size='sm' onClick={() => addNewItem()}>New Item
                            <FaPlus ></FaPlus></Button>
                    </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Code</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Vat</TableHead>
                            <TableHead className="text-right">Price</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.code}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.quantity ? item.quantity : 1}</TableCell>
                                <TableCell>{item.vatRate}</TableCell>
                                <TableCell className="text-right">{item.price}</TableCell>
                                <TableCell className='size-1'>
                                    <XIcon className='size-1 cursor-pointer' onClick={() => deleteItem(item.id)}></XIcon>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div id='totalInfo' className='w-full flex items-center justify-between border-none mt-10'>
                    <div className="grid gap-[.5rem] w-2/3">
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea className='dark:bg-slate-800/50' placeholder="Write invoice notes here." id="notes" />
                    </div>
                    <TableFooter >
                        <TableRow >
                            <TableCell className=' px-3 py-[.5rem]'>SubTotal</TableCell>
                            <TableCell className=' px-3 py-[.5rem]' ></TableCell>
                            <TableCell className="text-right  px-3 py-[.5rem]">$2,100.00</TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell className=' px-3 py-[.5rem]' >Vat</TableCell>
                            <TableCell className=' px-3 py-[.5rem]'></TableCell>
                            <TableCell className=" px-3 py-[.5rem] text-right">20%</TableCell>
                        </TableRow>
                        <TableRow className=' px-3 py-[.5rem]'>
                            <TableCell className=' px-3 py-[.5rem]'>Total</TableCell>
                            <TableCell className=' px-3 py-[.5rem]'></TableCell>
                            <TableCell className="text-right  px-3 py-[.5rem]">$2,500.00</TableCell>
                        </TableRow>
                    </TableFooter>
                </div>
                <div id="sumbitButton" className='mt-10'>
                    <Button size='base' className='float-right flex gap-[.5rem]'> Generate
                        <FaFileInvoice ></FaFileInvoice></Button>
                </div>
            </div>
        </div >
    )
}

export default Invoices;