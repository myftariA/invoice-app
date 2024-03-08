import { useEffect, useState } from 'react';
import { Button } from './components/ui/button';
import axios from 'axios';
import { CustomerDTO, CustomerTable } from './Types';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './components/ui/form';
import { Input } from './components/ui/input';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const customerSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(8),
    address: z.string().min(5),
    city: z.string().min(3),
    postalCode: z.string().min(3),
    country: z.string().min(3)
});

interface DialogProps {
    openDialog: boolean,
    onCloseDialog: any,
    customerData: CustomerTable | null,
    customerSaved: any
}
const CustomerDialog = ({ openDialog, onCloseDialog, customerData, customerSaved }: DialogProps) => {
    const [dialogState, setDialogState] = useState(openDialog);
    const customerForm = useForm<z.infer<typeof customerSchema>>({
        resolver: zodResolver(customerSchema)
    });
    const saveCustomer = () => {
        const { name, email, phone, address, city, postalCode, country } = customerForm.getValues();
        const custID = customerData?.id;
        const customerObject: CustomerDTO = {
            name,
            email,
            phone,
            address,
            city,
            postalCode,
            country
        };

        toast.promise(axios[custID ? 'put' : 'post']<CustomerDTO>(`/api/Customers${custID ? `/${custID}` : ''}`, customerObject), {
            loading: 'Posting customer data..',
            position: 'top-right',
            success: ({ data }) => {
                // setDialogState(false);
                customerSaved(data);
                return 'Customer data saved successfully!'
            },
            error: 'An error occurred while saving the customer!'
        });
    }
    useEffect(() => {
        customerForm.setValue('name', customerData?.name || '');
        customerForm.setValue('email', customerData?.email || '');
        customerForm.setValue('phone', customerData?.phone || '');
        customerForm.setValue('address', customerData?.address || '');
        customerForm.setValue('city', customerData?.city || '');
        customerForm.setValue('postalCode', customerData?.postalCode || '');
        customerForm.setValue('country', customerData?.country || '');
    }, [customerData]);

    useEffect(() => {
        setDialogState(openDialog);
    }, [openDialog]);

    return (
        <Dialog open={dialogState} onOpenChange={() => {
            onCloseDialog();
        }}>
            <DialogContent >
                <DialogHeader>
                    <DialogTitle>{customerData ? 'Editing cutomer: ' + customerData.name : 'Add Customer'}</DialogTitle>
                </DialogHeader>
                <Form {...customerForm}>
                    <form className="grid grid-cols-3 gap-1 mt-4" onSubmit={customerForm.handleSubmit(saveCustomer)}>
                        <FormField
                            control={customerForm.control}
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
                            control={customerForm.control}
                            name='email'
                            render={({ field }) => {
                                return <FormItem className='space-y-[.5rem]'>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Email' type='email' {...field}></Input>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }}
                        ></FormField>
                        <FormField
                            control={customerForm.control}
                            name='phone'
                            render={({ field }) => {
                                return <FormItem className='space-y-[.5rem]'>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Phone' type='tel' {...field}></Input>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }}
                        ></FormField>
                        <FormField
                            control={customerForm.control}
                            name='address'
                            render={({ field }) => {
                                return <FormItem className='space-y-[.5rem]'>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Address' type='text' {...field}></Input>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }}
                        ></FormField>
                        <FormField
                            control={customerForm.control}
                            name='city'
                            render={({ field }) => {
                                return <FormItem className='space-y-[.5rem] '>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input placeholder='City' type='text' {...field}></Input>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }}
                        ></FormField>
                        <FormField
                            control={customerForm.control}
                            name='postalCode'
                            render={({ field }) => {
                                return <FormItem className='space-y-[.5rem]'>
                                    <FormLabel>Postal Code</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Postal Code' type='text' {...field}></Input>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }}
                        ></FormField>
                        <FormField
                            control={customerForm.control}
                            name='country'
                            render={({ field }) => {
                                return <FormItem className='space-y-[.5rem] mb-10'>
                                    <FormLabel>Country</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Country' type='text' {...field}></Input>
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
            </DialogContent>
        </Dialog >
    )
}

export { CustomerDialog };

