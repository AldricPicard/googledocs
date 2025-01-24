import { BsCloudCheck} from "react-icons/bs";
import { Id } from "../../../../convex/_generated/dataModel";
import { useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useDebounce } from "@/hooks/use-debounce";
import { toast } from "sonner";
import { useStatus } from "@liveblocks/react";
import { LoaderIcon } from "lucide-react";

interface DocumentInputProps {
    id: Id<"documents">,
    title: string,
}

export const DocumentInput = ({ title, id}: DocumentInputProps) => {
    const status = useStatus();

    const [value, setValue] = useState(title);
    const [isPending, setIsPending] = useState(false);
    const [isEditting, setIsEditting] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const mutate = useMutation(api.documents.updatById);

    const debouncedUpdate = useDebounce((newValue: string) => {
        if(newValue === title) return;

        setIsPending(true);
        mutate({id, title: newValue})
            .then(() => toast.success("Document updated"))
            .catch(() => toast.error("Something went wrong"))
            .finally(() => setIsPending(false))
    })

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
        debouncedUpdate(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsPending(true);
        mutate({id, title: value})
            .then(() => {
                toast.success("Document updated");
                setIsEditting(false);
            })
            .catch(() => toast.error("Something went wrong"))
            .finally(() => setIsPending(false))
    }

    const showLoader = isPending || status === "connecting" || status === "reconnecting";
    const showError = status === "disconnected";

    return (
        <div className="flex items-center gap-2">
            {isEditting ? (
                <form onSubmit={handleSubmit} className="relative w-fit max-w-[50ch]">
                    <span className="invisible whitespace-pre px-1.5 text-lg">
                        { value || " "}
                    </span>
                    <input 
                        ref={inputRef}
                        value={value}
                        onChange={onChange}
                        onBlur={() => setIsEditting(false)}
                        className="absolute inset-0 text-lg text-black px-1.5 bg-transparent truncate"
                    />
                </form>
            ):(
                <span 
                    className="text-lg px-1.5 cursor-pointer truncate"
                    onClick={() => {
                        setIsEditting(true);
                        setTimeout(() => {
                            inputRef.current?.focus();
                        }, 0);
                    }}
                >
                        {title}
                </span>
            )}
            {showError && <BsCloudCheck className="size-4"/>}
            {!showError && !showLoader && <BsCloudCheck className="size-4"/>}
            {showLoader && <LoaderIcon className="size-4 animate-spin text-muted-foreground"/>}
        </div>
    )
}