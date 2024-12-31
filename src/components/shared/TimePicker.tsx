"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Label } from "@/components/ui/label";

const TimePicker = ({
  showSeconds = false,
  timeFormat = 12,
}: {
  showSeconds: boolean;
  timeFormat: 12 | 24;
}) => {
  const [selectedTime, setSelectedTime] = useState({
    hours: "--",
    minutes: "--",
    seconds: "--",
    timePeriod: "AM",
  });

  // const [formattedTime, setFormattedTime] = useState("");

  // const time = format(selectedTime, "HH:mm"); // "HH:mm" is the format for 24-hour time (e.g., 14:30)

  // // For 12-hour format with AM/PM
  // const time12Hour = format(selectedTime, "hh:mm a"); // "hh:mm a" (e.g., 02:30 PM)

  const hours12 = Array.from({ length: 12 }).map((_, index) =>
    String(index + 1)
  );
  const hours24 = Array.from({ length: 24 }).map((_, index) => String(index));
  const hours = timeFormat === 12 ? hours12 : hours24;

  const minutes = Array.from({ length: 60 }).map((_, index) => String(index));

  const seconds = Array.from({ length: 60 }).map((_, index) => String(index));

  return (
    <div>
      <Label>Select a Time</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className="w-[170px] flex justify-start pl-3 text-left font-normal tracking-widest"
          >
            <Clock className="h-4 w-4 opacity-50" />

            {`${selectedTime.hours}:${selectedTime.minutes}   ${selectedTime.timePeriod}`}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Card>
            <CardContent className="flex gap-3 px-3 py-0">
              <ScrollArea className="w-12 h-72 rounded-md">
                <div
                  key="hours"
                  className="w-full flex flex-col items-center py-4"
                >
                  {hours.map((hour) => (
                    <div key={hour} className="w-full">
                      <div
                        className="w-full text-center text-sm py-1 cursor-pointer hover:bg-accent"
                        onClick={() =>
                          setSelectedTime((prev) => ({
                            ...prev,
                            hours: hour.padStart(2, "0"),
                          }))
                        }
                      >
                        {hour.padStart(2, "0")}
                      </div>
                      <Separator />
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <ScrollArea className="w-12 h-72 rounded-md">
                <div className="w-full flex flex-col items-center py-4">
                  {minutes.map((minute) => (
                    <div key={minute} className="w-full">
                      <div
                        className="w-full text-center text-sm py-1 cursor-pointer hover:bg-accent"
                        onClick={() =>
                          setSelectedTime((prev) => ({
                            ...prev,
                            minutes: minute.padStart(2, "0"),
                          }))
                        }
                      >
                        {minute.padStart(2, "0")}
                      </div>
                      <Separator />
                    </div>
                  ))}
                </div>
              </ScrollArea>
              {showSeconds && (
                <ScrollArea className="w-12 h-72 rounded-md">
                  <div className="w-full flex flex-col items-center py-4">
                    {seconds.map((second) => (
                      <div key={second}>
                        <div
                          className="w-full text-center text-sm py-2 cursor-pointer hover:bg-accent"
                          onClick={() =>
                            setSelectedTime((prev) => ({
                              ...prev,
                              seconds: second.padStart(2, "0"),
                            }))
                          }
                        >
                          {second.padStart(2, "0")}
                        </div>
                        <Separator />
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
              {timeFormat === 12 && (
                <div className="w-12 flex flex-col items-center rounded-md text-center py-4">
                  <p
                    className="w-full text-sm py-1 cursor-pointer hover:bg-accent"
                    onClick={() =>
                      setSelectedTime((prev) => ({
                        ...prev,
                        timePeriod: "AM",
                      }))
                    }
                  >
                    AM
                  </p>
                  <Separator />
                  <p
                    className="w-full text-sm py-2 cursor-pointer hover:bg-accent"
                    onClick={() =>
                      setSelectedTime((prev) => ({
                        ...prev,
                        timePeriod: "PM",
                      }))
                    }
                  >
                    PM
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </PopoverContent>
      </Popover>
    </div>
  );
};
export default TimePicker;
