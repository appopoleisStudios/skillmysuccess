"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IconType } from "react-icons";
import qs from "query-string";

interface CategoryItemProps {
    label: string;
    icon?: IconType,
    value?: string;
}

export const CategoryItem = ({
    label, 
    icon: Icon, 
    value,
}: CategoryItemProps) => {
    const pathName = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentCategoryId = searchParams.get('categoryId');
    const currentTitle = searchParams.get('title');

    const isSelected = currentCategoryId === value;

    const onClick = () => {
        const url = qs.stringifyUrl({
            url: pathName,
            query: {
                title: currentTitle,
                categoryId: isSelected ? null : value,
            }
        }, { skipNull: true, skipEmptyString: true});

        router.push(url);
    };

    return (
        <button
            onClick={onClick}
            className={cn(
                "flex items-center ga[-x-1 py-2 px-3 text-sm border border-slate-200 rounded-full hover:border-sky-700 transition",
                isSelected && 'border-sky-700 bg-sky-200/20 text-sky-800'
            )}
            type="button"
        >
            {Icon && <Icon size={20} />}  
            <div className="truncate">
                {label}
            </div>          
        </button>
    )
}