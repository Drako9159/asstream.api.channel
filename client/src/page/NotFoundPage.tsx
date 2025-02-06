import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@radix-ui/themes";
import { HomeIcon } from "@heroicons/react/16/solid";

export default function NotFoundPage() {
    const location = useLocation();

    useEffect(() => {
        console.error(
            "404 Error: User attempted to access non-existent route:",
            location.pathname
        );
    }, [location.pathname]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted p-4">
            <div className="text-center space-y-8 animate-fadeIn">
                <div className="space-y-2">
                    <h1 className="text-8xl font-bold text-primary">404</h1>
                    <p className="text-2xl font-semibold text-muted-foreground">
                        Oops! Page not found
                    </p>
                </div>

                <div className="relative w-64 h-64 mx-auto">
                    <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse"></div>
                    <div className="absolute inset-4 bg-primary/20 rounded-full animate-pulse delay-75"></div>
                    <div className="absolute inset-8 bg-primary/30 rounded-full animate-pulse delay-150"></div>
                    <div className="absolute inset-12 bg-primary/40 rounded-full animate-pulse delay-300"></div>
                </div>

                <p className="text-muted-foreground max-w-md mx-auto">
                    The page you're looking for doesn't exist or has been moved.
                </p>

                <Button

                    onClick={() => window.location.href = '/'}
                    className="gap-2"
                >
                    <HomeIcon className="w-4 h-4" />

                    Return Home
                </Button>
                
            </div>
        </div>
    );
};
