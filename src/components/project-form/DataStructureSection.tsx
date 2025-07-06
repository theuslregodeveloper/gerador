
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { ProjectConfig } from "../PowerBIGenerator";

interface DataStructureSectionProps {
  config: ProjectConfig;
  onChange: (config: ProjectConfig) => void;
}

const DataStructureSection = ({ config, onChange }: DataStructureSectionProps) => {
  const [newDimension, setNewDimension] = useState("");
  const [newMeasure, setNewMeasure] = useState("");

  const addDimension = () => {
    if (newDimension.trim()) {
      onChange({
        ...config,
        dimensions: [...config.dimensions, newDimension.trim()]
      });
      setNewDimension("");
    }
  };

  const addMeasure = () => {
    if (newMeasure.trim()) {
      onChange({
        ...config,
        measures: [...config.measures, newMeasure.trim()]
      });
      setNewMeasure("");
    }
  };

  const removeDimension = (index: number) => {
    onChange({
      ...config,
      dimensions: config.dimensions.filter((_, i) => i !== index)
    });
  };

  const removeMeasure = (index: number) => {
    onChange({
      ...config,
      measures: config.measures.filter((_, i) => i !== index)
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-blue-700">Estrutura de Dados</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Dimensões */}
        <div>
          <Label>Dimensões</Label>
          <div className="flex gap-2 mt-1">
            <Input
              value={newDimension}
              onChange={(e) => setNewDimension(e.target.value)}
              placeholder="Ex: Data, Produto, Cliente"
              onKeyPress={(e) => e.key === 'Enter' && addDimension()}
            />
            <Button onClick={addDimension} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {config.dimensions.map((dim, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {dim}
                <button onClick={() => removeDimension(index)}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>

        {/* Medidas */}
        <div>
          <Label>Medidas</Label>
          <div className="flex gap-2 mt-1">
            <Input
              value={newMeasure}
              onChange={(e) => setNewMeasure(e.target.value)}
              placeholder="Ex: Vendas, Margem, Quantidade"
              onKeyPress={(e) => e.key === 'Enter' && addMeasure()}
            />
            <Button onClick={addMeasure} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {config.measures.map((measure, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {measure}
                <button onClick={() => removeMeasure(index)}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataStructureSection;
