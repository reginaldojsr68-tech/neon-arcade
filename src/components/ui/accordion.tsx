import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionContextType {
  activeItems: string[];
  toggleItem: (value: string) => void;
}

const AccordionContext = React.createContext<AccordionContextType | null>(null);

interface AccordionItemContextType {
  value: string;
  isOpen: boolean;
}

const AccordionItemContext = React.createContext<AccordionItemContextType | null>(null);

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple";
  collapsible?: boolean;
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
}

export function Accordion({
  type = "single",
  collapsible = true,
  defaultValue,
  value: valueProp,
  onValueChange,
  className,
  children,
  ...props
}: AccordionProps) {
  const [selected, setSelected] = React.useState<string[]>(() => {
    if (defaultValue) {
      return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    }
    return [];
  });

  const activeItems =
    valueProp !== undefined
      ? Array.isArray(valueProp)
        ? valueProp
        : [valueProp]
      : selected;

  const toggleItem = React.useCallback(
    (itemValue: string) => {
      let next: string[];
      if (type === "single") {
        if (activeItems.includes(itemValue)) {
          next = collapsible ? [] : [itemValue];
        } else {
          next = [itemValue];
        }
      } else {
        if (activeItems.includes(itemValue)) {
          next = activeItems.filter((v) => v !== itemValue);
        } else {
          next = [...activeItems, itemValue];
        }
      }

      if (valueProp === undefined) {
        setSelected(next);
      }
      onValueChange?.(type === "single" ? next[0] ?? "" : next);
    },
    [activeItems, type, collapsible, valueProp, onValueChange],
  );

  return (
    <AccordionContext.Provider value={{ activeItems, toggleItem }}>
      <div className={cn("space-y-1", className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function AccordionItem({ value, className, children, ...props }: AccordionItemProps) {
  const context = React.useContext(AccordionContext);
  const isOpen = context?.activeItems.includes(value) ?? false;

  return (
    <AccordionItemContext.Provider value={{ value, isOpen }}>
      <div className={cn("border-b", className)} {...props}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

export interface AccordionTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function AccordionTrigger({ className, children, ...props }: AccordionTriggerProps) {
  const rootContext = React.useContext(AccordionContext);
  const itemContext = React.useContext(AccordionItemContext);

  if (!rootContext || !itemContext) {
    throw new Error("AccordionTrigger must be used within AccordionItem");
  }

  const { toggleItem } = rootContext;
  const { value, isOpen } = itemContext;

  return (
    <h3 className="flex">
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => toggleItem(value)}
        className={cn(
          "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[aria-expanded=true]>svg]:rotate-180",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
      </button>
    </h3>
  );
}

export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AccordionContent({ className, children, ...props }: AccordionContentProps) {
  const itemContext = React.useContext(AccordionItemContext);
  const isOpen = itemContext?.isOpen ?? false;

  if (!isOpen) return null;

  return (
    <div className={cn("overflow-hidden text-sm transition-all pb-4 pt-0", className)} {...props}>
      <div>{children}</div>
    </div>
  );
}
