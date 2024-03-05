import { useRef, useState } from 'react';
import { useUserContext } from './UserContext';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const dummyUser = {
        username: 'armando',
        password: 'armando'
    }
    const { login } = useUserContext();
    const userRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [showError, setShowError] = useState(false);

    const handleLogin = () => {
        const username = userRef.current?.value;
        const password = passwordRef.current?.value;

        if (username === dummyUser.username && password === dummyUser.password) {
            login({ username, password });
            navigate('/invoices', { replace: true });
        } else {
            setShowError(true);
        }
    };

    return (
        <div className="h-full flex items-center justify-center">
            <Card className="w-[350px]">
                <form onSubmit={(e) => { e.preventDefault(); handleLogin }}>
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                        <CardDescription>Insert your credentials to log into the system.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full items-center gap-3">
                            <div className="flex flex-col space-y-1 ">
                                <Label htmlFor="username">Username</Label>
                                <Input id="username" type='text' placeholder="Username" ref={userRef} />
                            </div>
                            <div className="flex flex-col space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" placeholder="Password" ref={passwordRef} />
                            </div>
                        </div>
                        {showError &&
                            <Label className="text-red-500 text-sm">Can't find the user!</Label>
                        }
                    </CardContent>
                    <CardFooter>
                        <Button type='submit' className="w-full" size='lg' onClick={handleLogin} >Sign In</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default Login;
