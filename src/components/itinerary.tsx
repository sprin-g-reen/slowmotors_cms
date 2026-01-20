import { Separator } from "@/components/ui/separator";

interface ItineraryItem {
  day: number;
  activity: string;
}

interface ItineraryContent {
  itinerary?: ItineraryItem[];
  description?: string;
}

interface ItineraryProps {
  content: string; // JSON string
}

export function Itinerary({ content }: ItineraryProps) {
  let safeContent: ItineraryContent | null = null;

  try {
    safeContent = JSON.parse(content) as ItineraryContent;
  } catch (e) {
    return null;
  }

  if (!safeContent?.itinerary || safeContent.itinerary.length === 0) {
    return null;
  }

  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-semibold tracking-tight">Itinerary</h3>
      <div className="relative border-l border-muted pl-6 ml-3 space-y-8">
        {safeContent.itinerary.map((item, index) => (
          <div key={index} className="relative">
             <span className="absolute -left-[2.4rem] flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground ring-4 ring-background">
              {item.day}
            </span>
            <div className="flex flex-col space-y-1">
              <h4 className="text-lg font-medium leading-none">Day {item.day}</h4>
              <p className="text-muted-foreground">{item.activity}</p>
            </div>
            {safeContent.itinerary && index < safeContent.itinerary.length - 1 && (
               <Separator className="my-6 opacity-0" /> // Spacer
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
