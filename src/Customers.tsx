import React from 'react';
import { z } from 'zod';

const Customers: React.FC = () => {
    return (<>Welcome to Customers page</>)
    // interface customerField {
    //     id: string,
    //     label: string,
    //     type: string,
    //     value: string,
    //     schema: any
    // }
    // const customerFields: customerField[] = [
    //     {
    //         id: "name",
    //         label: "Name",
    //         type: 'text',
    //         value: '',
    //         schema: z.string().min(2, 'Ju lutem vendosni nje emer te sakte')
    //     },
    //     {
    //         id: "phone",
    //         label: "Phone",
    //         type: 'tel',
    //         value: '',
    //         schema: z.string().min(8, 'Ju lutem kontrolloni numrin e telefonit')
    //     },
    //     {
    //         id: "email",
    //         label: "Email",
    //         type: 'email',
    //         value: '',
    //         schema: z.string().email('Ju lutem kontrolloni email'),
    //     },
    //     {
    //         id: "address",
    //         label: "Address",
    //         type: 'address',
    //         value: '',
    //         schema: z.string().min(10, 'Vendosni adresen e sakte')
    //     }
    // ]
    // function updateCustomerValues(event: React.ChangeEvent<HTMLInputElement>, customer: customerField[], ind: number) {
    //     try {
    //         customer[ind].schema.parse(event.target.value);
    //         console.log('valid schema');
    //     } catch (err: any) {
    //         console.log(err.message);
    //     }
    //     customer[ind].value = event.target.value;
    // }
    // return (
    //     <div className="flex flex-col w-full">
    //         <div id='customerInfo' className="grid grid-cols-3 gap-3 w-full">
    //             {customerFields.map((key, i) => (
    //                 <div key={key.id} className={i == 3 ? 'col-span-full' : ''}>
    //                     <label htmlFor={customerFields[i].id}>{customerFields[i].label}</label>
    //                     <input
    //                         required
    //                         type={customerFields[i].type}
    //                         key={key.id}
    //                         placeholder={customerFields[i].label}
    //                         className='input w-full'
    //                         onBlur={(evt) => updateCustomerValues(evt, customerFields, i)}
    //                     />
    //                 </div>
    //             ))}
    //         </div>
    //         <div id='invoiceEntries'></div>
    //         <div id='totalInfo'></div>
    //     </div>
    // )
}

export default Customers;