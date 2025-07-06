
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectConfig } from "../PowerBIGenerator";

interface VisualizationsSectionProps {
  config: ProjectConfig;
  onChange: (config: ProjectConfig) => void;
}

const VisualizationsSection = ({ config, onChange }: VisualizationsSectionProps) => {
  const visualOptions = [
    "Gráfico de Barras", "Gráfico de Linhas", "Gráfico de Pizza", 
    "Tabela", "Cartão", "Medidor", "Mapa", "Gráfico de Dispersão",
    "Funil", "Cascata", "Treemap", "Gráfico de Área"
  ];

  const toggleVisualization = (viz: string) => {
    const isSelected = config.visualizations.includes(viz);
    onChange({
      ...config,
      visualizations: isSelected 
        ? config.visualizations.filter(v => v !== viz)
        : [...config.visualizations, viz]
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-blue-700">Visualizações</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {visualOptions.map((viz) => (
            <div key={viz} className="flex items-center space-x-2">
              <Checkbox
                id={viz}
                checked={config.visualizations.includes(viz)}
                onCheckedChange={() => toggleVisualization(viz)}
              />
              <Label htmlFor={viz} className="text-sm cursor-pointer">
                {viz}
              </Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default VisualizationsSection;
