import React, { useEffect, useState } from 'react';
import { DataTable } from './DataTable';
import { Button } from './components/ui/button';
import axios from 'axios';
import { Item, ItemDTO, ItemTable } from './Types';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './components/ui/form';

import { Input } from './components/ui/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from './components/ui/textarea';

const itemSchema = z.object({
    name: z.string().min(2),
    code: z.string().min(2),
    price: z.string(),
    itemType: z.number(),
    vatRate: z.number(),
    description: z.string().min(3),
    uom: z.string().min(2),
});

const Items: React.FC = () => {
    const [editItemData, setEditItemData] = useState<ItemTable | null>(null);
    const [itemsList, setItemsList] = useState<ItemTable[]>([]);
    const [openDialog, setOpenDialog] = useState(false);

    const itemForm = useForm<z.infer<typeof itemSchema>>({
        resolver: zodResolver(itemSchema)
    });

    const getItemsList = async () => {
        try {
            toast.promise(axios.get<Item[]>('/api/Items'), {
                loading: 'Loading items..',
                success: (itemData) => {
                    const data = itemData.data.map(({ id, name, code, price, itemType, vatRate, description, uom }) => ({ id, name, code, price, itemType, vatRate, description, uom } as ItemTable));
                    setItemsList(data);
                    return 'Items list loaded!'
                },
                error: 'An error occurred generating the invoice!'
            });

        } catch (error: any) {
            toast.error('Error fetching items list', {
                description: error?.message,
                cancel: {
                    label: 'Close'
                }
            });
        }
    };
    useEffect(() => {
        const controller = new AbortController();
        axios.get<Item[]>('/api/Items', {
            signal: controller.signal
        })
            .then(resp => {
                const data = resp.data.map(({ id, name, code, price, itemType, vatRate, description, uom }) => ({ id, name, code, price, itemType, vatRate, description, uom } as ItemTable));
                setItemsList(data);
                toast.success('Items loaded successfully');
            });

        return () => controller.abort();
    }, []);

    const saveItem = () => {
        const { name, code, price, itemType, vatRate, description, uom } = itemForm.getValues();
        const id = editItemData?.id;
        const itemObject: ItemDTO = {
            id,
            name,
            code,
            price: +price,
            itemType,
            vatRate,
            description,
            uom
        };
        toast.promise(axios[id ? 'put' : 'post']<ItemDTO>(`/api/Items${id ? `/${id}` : ''}`, itemObject), {
            position: 'top-right',
            loading: 'Posting item data..',
            success: () => {
                setOpenDialog(false);
                getItemsList();
                return 'Item data saved successfully!'
            },
            error: 'An error occurred while saving the item!'
        });
    }
    const editItem = (itemData: ItemTable) => {
        setEditItemData(itemData);
        setOpenDialog(true);
        if (itemData) {
            itemForm.setValue('name', itemData.name || '');
            itemForm.setValue('code', itemData.code || '');
            itemForm.setValue('price', itemData.price.toString() || '');
            itemForm.setValue('itemType', itemData.itemType || 0);
            itemForm.setValue('vatRate', itemData.vatRate || 0);
            itemForm.setValue('uom', itemData.uom || '');
            itemForm.setValue('description', itemData.description || '');
        }
    }

    return (
        <>
            <Dialog open={openDialog} onOpenChange={(open) => {
                itemForm.clearErrors();
                itemForm.resetField('name');
                itemForm.resetField('code');
                itemForm.resetField('price');
                itemForm.resetField('itemType');
                itemForm.resetField('vatRate');
                itemForm.resetField('description');
                setOpenDialog(open);
            }}>
                <DialogTrigger asChild >
                    <Button size={'sm'} className='float-right' onClick={() => {
                        setEditItemData(null);
                        setOpenDialog(true);
                    }} >Add Item</Button>
                </DialogTrigger>
                <DialogContent >
                    <DialogHeader>
                        <DialogTitle>{editItemData ? 'Editing cutomer: ' + editItemData.name : 'Add Item'}</DialogTitle>
                    </DialogHeader>
                    <Form {...itemForm}>
                        <form className="grid grid-cols-3 gap-1 mt-4" onSubmit={itemForm.handleSubmit(saveItem)}>
                            <FormField
                                control={itemForm.control}
                                name='name'
                                render={({ field }) => {
                                    return (
                                        <FormItem className='space-y-[.5rem]'>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='Name'
                                                    type='text'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            ></FormField>
                            <FormField
                                control={itemForm.control}
                                name='code'
                                render={({ field }) => {
                                    return <FormItem className='space-y-[.5rem]'>
                                        <FormLabel>Code</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Code' type='text' {...field}></Input>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                }}
                            ></FormField>
                            <FormField
                                control={itemForm.control}
                                name='price'
                                render={({ field }) => {
                                    return <FormItem className='space-y-[.5rem]'>
                                        <FormLabel>Price</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Price'
                                                type='number'
                                                step={'0.01'}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                }}
                            ></FormField>
                            <FormField
                                control={itemForm.control}
                                name='itemType'
                                render={() => {
                                    return <FormItem className='space-y-[.5rem]'>
                                        <FormLabel>Type</FormLabel>
                                        <FormControl>
                                            <Select
                                                value={itemForm.getValues('itemType')}
                                                name="itemType"
                                                onValueChange={(value) => {
                                                    itemForm.setValue('itemType', +value as 1 | 2);
                                                }}
                                            >
                                                <SelectTrigger className="p-1" >
                                                    <SelectValue placeholder="Select a type" />
                                                </SelectTrigger>
                                                <SelectContent className='min-w-[200px]'>
                                                    <SelectGroup >
                                                        <SelectItem value={0}
                                                            className='flex justify-center'
                                                        >Service</SelectItem>
                                                        <SelectItem value={1}
                                                            className='flex justify-center'
                                                        >Inventory</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                }}
                            ></FormField>
                            <FormField
                                control={itemForm.control}
                                name='vatRate'
                                render={() => {
                                    return <FormItem className='space-y-[.5rem] '>
                                        <FormLabel>Vat Rate</FormLabel>
                                        <FormControl>
                                            <Select
                                                value={itemForm.getValues('vatRate')}
                                                name="vatRate"
                                                onValueChange={(value) => {
                                                    itemForm.setValue('vatRate', +value as 0.0 | 0.2);
                                                }}
                                            >
                                                <SelectTrigger className="p-1" >
                                                    <SelectValue placeholder="Select a type" />
                                                </SelectTrigger>
                                                <SelectContent className='min-w-[200px]'>
                                                    <SelectGroup>
                                                        <SelectItem value={0.0}
                                                            className='flex justify-center'
                                                        >0%</SelectItem>
                                                        <SelectItem value={0.2}
                                                            className='flex justify-center'>20%</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                }}
                            ></FormField>
                            <FormField
                                control={itemForm.control}
                                name='uom'
                                render={() => {
                                    return <FormItem className='space-y-[.5rem] '>
                                        <FormLabel>Unit</FormLabel>
                                        <FormControl>
                                            <Select
                                                value={itemForm.getValues('uom')}
                                                name="uom"
                                                onValueChange={(value) => {
                                                    itemForm.setValue('uom', value);
                                                }}
                                            >
                                                <SelectTrigger className="p-1" >
                                                    <SelectValue placeholder="Select unit" />
                                                </SelectTrigger>
                                                <SelectContent className='min-w-[200px]'>
                                                    <SelectGroup>
                                                        <SelectItem value={'kg'}
                                                            className='flex justify-center'
                                                        >Kilogram</SelectItem>
                                                        <SelectItem value={'cope'}
                                                            className='flex justify-center'
                                                        >Cope</SelectItem>
                                                        <SelectItem value={'pako'}
                                                            className='flex justify-center'
                                                        >Pako</SelectItem>
                                                        <SelectItem value={'kuti'}
                                                            className='flex justify-center'
                                                        >Kuti</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                }}
                            ></FormField>
                            <FormField
                                control={itemForm.control}
                                name='description'
                                render={({ field }) => {
                                    return <FormItem className='space-y-[.5rem] mb-16 col-span-3 '>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder='Description' {...field}></Textarea>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                }}
                            ></FormField>
                            <DialogFooter className='absolute bottom-0 right-0 p-3'>
                                <Button type="submit" size={'lg'}>Save</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent >
            </Dialog >
            {itemsList.length > 0 && <DataTable
                key={JSON.stringify(itemsList)} headers={['Name', 'Code', 'Price', 'Item Type', 'Vat Rate', 'Unit', 'Decription']} columns={itemsList as any} endpoint='Items' editRecord={editItem}></DataTable>}
        </>
    )
}

export { Items };

