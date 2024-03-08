import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { EditIcon, TrashIcon } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import axios from "axios";
import { useState } from "react";

interface Columns {
    id: number;
    [key: string]: any;
};

interface TableProps {
    headers: string[],
    columns: Columns[],
    endpoint: string,
    editRecord?: any
}

const DataTable = ({ headers, columns, endpoint, editRecord }: TableProps) => {
    const [tableData, setTableData] = useState([...columns]);
    return (
        <>
            <Table >
                <TableHeader >
                    <TableRow>
                        {headers.map((header) => (
                            <TableHead key={header}>{header}</TableHead>
                        ))}
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tableData.map((col) => (
                        <TableRow key={col.id} >
                            {Object.keys(col).map((key) => (
                                key !== 'id' &&
                                <TableCell className="font-medium" key={col.id + key}>{col[key]}</TableCell>
                            ))}
                            <TableCell className='size-1 text-right flex justify-start flex-row'>
                                <button title='Edit' className="bg-transparent focus:outline-none border-none hover:border-none hover:scale-110 duration-200 transition-all"
                                    onClick={() => editRecord(col)}>
                                    <EditIcon className='size-[.9rem] cursor-pointer'></EditIcon>
                                </button>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <button title='Delete' className="bg-transparent focus:outline-none border-none hover:border-none hover:scale-110 duration-200 transition-all">
                                            <TrashIcon className='size-[.9rem]  cursor-pointer'></TrashIcon>
                                        </button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete this record and remove it from the servers.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel >Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => {
                                                toast.promise(axios.delete(`/api/${endpoint}/${col.id}`), {
                                                    loading: 'Deleting in progress..',
                                                    success: () => {
                                                        columns.splice(tableData.findIndex(el => el.id === col.id));
                                                        setTableData(columns);
                                                        return 'Record deleted!'
                                                    },
                                                    error: (err) => { return err.response.statusText }
                                                });
                                            }} >Delete</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table >

        </>
    )

}

export { DataTable };