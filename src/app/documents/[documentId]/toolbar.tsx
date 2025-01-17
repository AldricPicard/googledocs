"use client"
import React, { useState } from 'react';
import { type ColorResult, SketchPicker } from 'react-color';
import { type Level } from '@tiptap/extension-heading';
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { 
    AlignCenterIcon,
    AlignJustifyIcon,
    AlignLeftIcon,
    AlignRightIcon,
    BoldIcon,
    ChevronDownIcon,
    HighlighterIcon,
    ImageIcon,
    ItalicIcon, 
    Link2Icon, 
    ListCollapseIcon, 
    ListIcon, 
    ListOrdered, 
    ListTodoIcon, 
    LucideIcon, 
    MessageSquarePlusIcon, 
    MinusIcon, 
    PlusIcon, 
    PrinterIcon, 
    Redo2Icon, 
    RemoveFormattingIcon, 
    SearchIcon, 
    SpellCheckIcon, 
    UnderlineIcon, 
    Undo2Icon, 
    UploadIcon
} from "lucide-react";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const LineHightButton = () => {
    const { editor } = useEditorStore();

    const lineHeight = [
       { label : "Default", value: "normal"},
       { label : "Single", value: "1"},
       { label : "1.15", value: "1.15"},
       { label : "1.15", value: "1.5"},
       { label : "Double", value: "2"}
    ]

    return ( 
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 text-sm overflow-hidden">
                    
                    <ListCollapseIcon className='size-4'/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
                {lineHeight.map(({label, value}) => (
                    <button 
                        key={value}
                        onClick={() => editor?.chain().focus().setLineHeight(value).run()}
                        className={cn(
                            "flex items-center gap-x-2 px-2 rounded-sm hover:bg-neutral-200/80",
                            editor?.getAttributes("paragraph").lineHeight === value && "bg-neutral-200/80"
                        )}
                    >
                        <span className='text-sm'>{label}</span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const FontSizeButton = () => {
    const { editor } = useEditorStore();

    const currentFontSize = editor?.getAttributes('textStyle').fontSize
        ? editor?.getAttributes("textStyle").fontSize.replace("px", "")
        : "16"

        
    const [fontSize, setFontSize] = useState(currentFontSize);
    const [inputValue, setInputValue] = useState(fontSize);
    const [isEditing, setIsEditting] = useState(false);

    const updateFontSize = (newSize: string) => {
        const size = parseInt(newSize);
        if (!isNaN(size) && size > 0) {
            editor?.chain().focus().setFontSize(`${size}px`).run();
            
            
            setFontSize(newSize);
            setInputValue(newSize);
            setIsEditting(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    const handleInputBlur = () => {
        updateFontSize(inputValue);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            updateFontSize(inputValue);
            editor?.commands.focus();
        }
    }

    const increment = ( ) => {
        const newSize = parseInt(fontSize) + 1;
        updateFontSize(newSize.toString());
    }

    const decrement = ( ) => {
        const newSize = parseInt(fontSize) - 1;
        if (newSize > 0) {
            updateFontSize(newSize.toString());
        }
    }

    return ( 
        <div className="flex items-center gap-x-0.5">
            
            <button 
                className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80"
                onClick={decrement}
            >  
                <MinusIcon className='size-4'/>
            </button>
            {isEditing ? (
                <input 
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    onKeyDown={handleKeyDown}
                    className="h-7 w-10 text-sm border text-center border-neutral-400 rounded-sm focus:ring-0 bg-transparent focus:outline-none"
                />
            ) : (
                <button
                    onClick={()=>{
                        setIsEditting(true);
                        setFontSize(currentFontSize);
                    }}
                    className="h-7 w-10 text-sm border text-center border-neutral-400 rounded-sm bg-transparent cursor-text"
                >
                    {currentFontSize}
                </button>
            )}
            
            <button 
                className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80"
                onClick={increment}
            >  
                <PlusIcon className='size-4'/>
            </button>
            
        </div>
    )
}

const ListButton = () => {
    const { editor } = useEditorStore();

    const lists = [
        {
            label: "Bullet List",
            icon: ListIcon,
            isActive: () => editor?.isActive("bulletList"),
            onClick: () => editor?.chain().focus().toggleBulletList().run(),
        },
        {
            label: "Ordered List",
            icon: ListOrdered,
            isActive: () => editor?.isActive("orderedlist"),
            onClick: () => editor?.chain().focus().toggleOrderedList().run(),
        },
    ]

    return ( 
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 text-sm overflow-hidden">
                    
                    <ListIcon className='size-4'/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
                {lists.map(({label, icon: Icon, onClick, isActive}) => (
                    <button 
                        key={label}
                        onClick={onClick}
                        className={cn(
                            "flex items-center gap-x-2 px-2 rounded-sm hover:bg-neutral-200/80",
                            isActive() && "bg-neutral-200/80"
                        )}
                    >
                        <Icon className='size-4'/>
                        <span className='text-sm'>{label}</span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const AlignButton = () => {
    const { editor } = useEditorStore();

    const alignment = [
        {
            label: "Align Left",
            value: "left",
            icon: AlignLeftIcon
        },
        {
            label: "Align Center",
            value: "center",
            icon: AlignCenterIcon
        },
        {
            label: "Align Right",
            value: "right",
            icon: AlignRightIcon
        },
        {
            label: "Align Justify",
            value: "justify",
            icon: AlignJustifyIcon
        }
    ]

    return ( 
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 text-sm overflow-hidden">
                    
                    <AlignLeftIcon className='size-4'/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
                {alignment.map(({label, value, icon: Icon}) => (
                    <button 
                        key={value}
                        onClick={() => editor?.chain().focus().setTextAlign(value).run()}
                        className={cn(
                            "flex items-center gap-x-2 px-2 rounded-sm hover:bg-neutral-200/80",
                            editor?.isActive({ TextAlign: value}) && "bg-neutral-200/80"
                        )}
                    >
                        <Icon className='size-4'/>
                        <span className='text-sm'>{label}</span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const ImageButton = () => {
    const { editor } = useEditorStore();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [ imageUrl, setImageUrl ] = useState("");

    const onChange = (src: string) => {
        editor?.chain().focus().setImage({ src }).run()
    };

    const onUpload = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image.*";

        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                const imageUrl = URL.createObjectURL(file);
                onChange(imageUrl);
            }
        }

        input.click();
    };

    const handleImageUrlSubmit = () => {
        if (imageUrl) {
            onChange(imageUrl);
            setImageUrl("");
            setIsDialogOpen(false);
        }
    };


    return ( 
        <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 text-sm overflow-hidden">
                    
                    <ImageIcon className='size-4'/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={onUpload}>
                    <UploadIcon className='size-4 mr-2'/>
                    Upload
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
                    <SearchIcon className='size-4 mr-2'/>
                    <p>Lien URL </p>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Insérez l'URL de l'image</DialogTitle>
                </DialogHeader>
                <Input
                    placeholder='URL image'
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleImageUrlSubmit();
                        }
                    }}
                />
                <DialogFooter>
                    <Button onClick={handleImageUrlSubmit}>
                        Valider
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        </>
    );
}

const LinkButton = () => {
    const { editor } = useEditorStore();
    const [ value, setValue ] = useState("");

    const onChange = (href: string) => {
        editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
        setValue("");
    };

    return ( 
        <DropdownMenu onOpenChange={(open) => {
            if (open) {
                setValue(editor?.getAttributes("link").href || "")
            }
        }}>
            <DropdownMenuTrigger asChild>
                <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 text-sm overflow-hidden">
                    
                    <Link2Icon className='size-4'/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-2.5 flex items-center gap-x-2'>
                <Input
                    placeholder='https://example.com'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <Button onClick={() => onChange(value)}>
                    Apply
                </Button>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const TextColorButton = () => {
    const { editor } = useEditorStore();

    const value = editor?.getAttributes("textSyle").color || "#000000"

    const onChange = (color: ColorResult) => {
        editor?.chain().focus().setColor(color.hex).run();
    };

    return ( 
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 text-sm overflow-hidden">
                    <span className="text-xs">A</span>
                    <div className="h-0.5 w-full " style={{backgroundColor: value}}/>
                    
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-0'>
                <SketchPicker
                    color={value}
                    onChange={onChange}
                />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const HighlightButtonColor = () => {
    const { editor } = useEditorStore();

    const value = editor?.getAttributes("highlight").color || "#FFFFFF";

    const onChange = (color: ColorResult) => {
        editor?.chain().focus().setHighlight({color: color.hex}).run();
    };

    return ( 
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 text-sm overflow-hidden">
                    
                    <HighlighterIcon className='size-4'/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-0'>
                <SketchPicker
                    color={value}
                    onChange={onChange}
                />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const HeadingLevelButton = () => {
    const {editor} = useEditorStore();

    const headings = [
        { label: "Normal Text", value: 0, fontSize: "16px"},
        { label: "Heading 1", value: 1, fontSize: "32px"},
        { label: "Heading 2", value: 2, fontSize: "24px"},
        { label: "Heading 3", value: 3, fontSize: "20px"},
        { label: "Heading 4", value: 4, fontSize: "18px"},
        { label: "Heading 5", value: 5, fontSize: "16px"},
    ];

    const getCurrentHeading = () => {
        for (let level = 1; level <= 5; level++){
            if (editor?.isActive("heading", { level })) {
                return `Heading ${level}`;
            }
        }
        return "Normal text";
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 text-sm overflow-hidden">
                    <span className="truncate">
                        {getCurrentHeading()}
                    </span>
                    <ChevronDownIcon className="ml-2 size-4 shrink-0"/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                {headings.map(({label, value, fontSize}) => (
                    <button 
                        key={value}
                        style={{ fontSize }}
                        onClick={() => {
                            if( value === 0){
                                editor?.chain().focus().setParagraph().run();
                            }else{
                                editor?.chain().focus().toggleHeading({ level : value as Level }).run();
                            }
                        }}
                        className={cn(
                            "flex items-center gap-x-2 px-2 py-1 font-[value] rounded-sm hover:bg-neutral-200/80",
                            (value === 0 && !editor?.isActive("heading")) || editor?.isActive("heading", { level: value }) && "bg-neutral-200/80"
                        )}
                    >
                        {label}
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const FontFamilyButton = () => {
    const {editor} = useEditorStore();

    const fonts = [
        { label: "Arial", value: "Arial"},
        { label: "Times New Roman", value: "Times New Roman"},
        { label: "Courier New", value: "Courier New"},
        { label: "Georgia", value: "Georgia"},
        { label: "Verdana", value: "Verdana"},
        { label: "Comic Sans MS", value: "Comic Sans MS"},
        { label: "Monospace", value: "Monospace"},
        
        

    ];
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 text-sm overflow-hidden">
                    <span className="truncate">
                        {editor?.getAttributes("textStyle").fontFamily || "Arial"}
                    </span>
                    <ChevronDownIcon className="ml-2 size-4 shrink-0"/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                {fonts.map(({ label, value }) => (
                    <button 
                        onClick={() => editor?.chain().focus().setFontFamily(value).run()}
                        key={value}
                        className={cn(
                            "flex items-center gap-x-2 px-2 py-1 font-[value] rounded-sm hover:bg-neutral-200/80",
                            editor?.getAttributes("textStyle").fontFamily === value && "bg-neutral-200/80"
                        )}
                        style={{ fontFamily: value}}
                    >
                        <span className="text-sm">{ label }</span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

interface ToolbalButtonProps {
    onClick?: () => void;
    isActive?: boolean;
    icon: LucideIcon;
};

const ToolbarButton = ({
    onClick,
    isActive,
    icon: Icon,
}: ToolbalButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={cn(
                "text-sm h-7 max-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
                isActive && "bg-neutral-200/80"
            )}
        >
            <Icon className="size-4"/>
        </button>
    )
}

export const Toolbar = () => {
    const { editor } = useEditorStore();
    
    
    const sections: {
        label: string;
        icon: LucideIcon;
        onClick: () => void;
        isActive?: boolean;
    } [][] = [
        [
            {
                label: "Undo",
                icon: Undo2Icon,
                onClick: () => editor?.chain().focus().undo().run(),
            },
            {
                label: "Redo",
                icon: Redo2Icon,
                onClick: () => editor?.chain().focus().redo().run(),
            },
            {
                label: "Print",
                icon: PrinterIcon,
                onClick: () => window.print(),
            },
            {
                label: "Spell Chek",
                icon: SpellCheckIcon,
                onClick: () => {
                    const current = editor?.view.dom.getAttribute("spellcheck");
                    editor?.view.dom.setAttribute("spellcheck", current === "false" ? "true" : "false")
                },
            },
        ],
        [
            {
                label: "Bold",
                icon: BoldIcon,
                isActive: editor?.isActive("bold"),
                onClick: () => editor?.chain().focus().toggleBold().run(),
            },
            {
                label: "Italic",
                icon: ItalicIcon,
                isActive: editor?.isActive("italic"),
                onClick: () => editor?.chain().focus().toggleItalic().run(),
            },
            {
                label: "Underline",
                icon: UnderlineIcon,
                isActive: editor?.isActive("underline"),
                onClick: () => editor?.chain().focus().toggleUnderline().run(),
            },
        ],
        [
            {
                label: "Comment",
                icon: MessageSquarePlusIcon,
                onClick: () => editor?.chain().focus().addPendingComment().run(),
                isActive: editor?.isActive("liveblock")
            },
            {
                label: "List Todo",
                icon: ListTodoIcon,
                onClick: () => editor?.chain().focus().toggleTaskList().run(),
                isActive: editor?.isActive("tasklist"),
            },
            {
                label: "Remove Formatting",
                icon: RemoveFormattingIcon,
                onClick: () => editor?.chain().focus().unsetAllMarks().run(),
            },
        ],
    ];
    return (
        <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
            {sections[0].map((item) => (
                <ToolbarButton key={item.label} {...item}/>
            ))}
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />
            <FontFamilyButton/>
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />
            {/* TODO: Heading */}
            <HeadingLevelButton/>
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />
            <FontSizeButton />
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />
            {sections[1].map((item) => (
                <ToolbarButton key={item.label} {...item}/>
            ))}
            {/* TODO: Text color */}
            <TextColorButton/>  
            <HighlightButtonColor/>
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />
            <LinkButton/>
            <ImageButton/>
            <AlignButton/>
            <LineHightButton/>
            <ListButton/>
            {sections[2].map((item) => (
                <ToolbarButton key={item.label} {...item}/>
            ))}
        </div>
    );
}

