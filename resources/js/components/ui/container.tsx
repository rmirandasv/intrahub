export default function Container({ children }: { children: React.ReactNode }) {
    return <div className="m-4 min-h-[100vh] flex-1 rounded-xl bg-muted/50 p-4">{children}</div>;
}