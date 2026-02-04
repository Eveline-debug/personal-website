import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Edit2, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface CardComponentProps {
  id: string;
  type: string;
  label: string;
  icon: string;
  content: string[];
  onUpdate: (id: string, content: string[]) => void;
}

export function CardComponent({
  id,
  type,
  label,
  icon,
  content,
  onUpdate,
}: CardComponentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content.join("\n"));

  const handleSave = () => {
    const newContent = editContent
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
    onUpdate(id, newContent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditContent(content.join("\n"));
    setIsEditing(false);
  };

  const isEmpty = !content || content.length === 0;

  return (
    <Card
      className={cn(
        "transition-all duration-200",
        isEditing && "ring-2 ring-primary shadow-lg",
        isEmpty && "opacity-60"
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <span className="text-xl">{icon}</span>
          {label}
        </CardTitle>
        {!isEditing && id && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="h-8 w-8 p-0"
          >
            <Edit2 className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-3">
            <Textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              placeholder="每行一条要点（不超过30字）"
              rows={6}
              className="resize-none"
            />
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancel}
              >
                <X className="h-4 w-4 mr-1" />
                取消
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
              >
                <Check className="h-4 w-4 mr-1" />
                保存
              </Button>
            </div>
          </div>
        ) : isEmpty ? (
          <p className="text-sm text-muted-foreground italic">
            原文未明确提及此维度
          </p>
        ) : (
          <ul className="space-y-2">
            {content.map((item, index) => (
              <li
                key={index}
                className="text-sm leading-relaxed flex gap-2 items-start"
              >
                <span className="text-primary font-bold shrink-0">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
