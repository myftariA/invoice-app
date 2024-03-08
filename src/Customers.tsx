import React, { useEffect, useState } from 'react';
import { DataTable } from './DataTable';
import { Button } from './components/ui/button';
import axios from 'axios';
import { Customer, CustomerTable } from './Types';
import { toast } from 'sonner';

import { CustomerDialog } from './CustomerDialog';

const Customers: React.FC = () => {
    const [editCustomerData, setEditCustomerData] = useState<CustomerTable | null>(null);
    const [customersList, setCustomersList] = useState<CustomerTable[]>([]);
    const [openDialog, setOpenDialog] = useState(false);

    const getCustomersList = async () => {
        try {
            axios.get<Customer[]>('/api/Customers').then(custData => {
                const data = custData.data.map(({ id, name, phone, email, address, city, postalCode, country }) => ({ id, name, phone, email, address, city, postalCode, country }) as CustomerTable);
                setCustomersList(data);
                setOpenDialog(false);
            });
        } catch (error: any) {
            toast.error('Error fetching customers list', {
                description: error?.message,
                cancel: {
                    label: 'Close'
                }
            });
        }
    };
    useEffect(() => {
        const controller = new AbortController();
        axios.get<Customer[]>('/api/Customers', {
            signal: controller.signal
        })
            .then(resp => {
                const data = resp.data.map(({ id, name, phone, email, address, city, postalCode, country }) => ({ id, name, phone, email, address, city, postalCode, country }) as CustomerTable);
                setCustomersList(data);
                toast.success('Customers fetched successfully');
            });

        return () => controller.abort();
    }, []);

    const editCustomer = (customerData: CustomerTable) => {
        setEditCustomerData(customerData);
        setOpenDialog(true);
    }
    return (
        <>
            <Button size={'sm'} className='float-right' onClick={() => {
                setEditCustomerData(null);
                setOpenDialog(true);
            }}>Add Customer</Button>
            <CustomerDialog
                openDialog={openDialog}
                onCloseDialog={() => setOpenDialog(false)}
                customerData={editCustomerData}
                customerSaved={getCustomersList}
            ></CustomerDialog>
            {customersList.length > 0 && <DataTable
                key={JSON.stringify(customersList)} headers={['Name', 'Email', 'Phone', 'Address', 'City']} columns={customersList as any} endpoint='Customers' editRecord={editCustomer}></DataTable>}
        </>
    )
}

export { Customers };

