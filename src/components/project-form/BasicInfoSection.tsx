
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectConfig } from "../PowerBIGenerator";

interface BasicInfoSectionProps {
  config: ProjectConfig;
  onChange: (config: ProjectConfig) => void;
}

const BasicInfoSection = ({ config, onChange }: BasicInfoSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-blue-700">Informações Básicas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="projectName">Nome do Projeto</Label>
          <Input
            id="projectName"
            value={config.projectName}
            onChange={(e) => onChange({ ...config, projectName: e.target.value })}
            placeholder="Ex: Dashboard de Vendas 2024"
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            value={config.description}
            onChange={(e) => onChange({ ...config, description: e.target.value })}
            placeholder="Descreva o objetivo e escopo do projeto..."
            className="mt-1"
            rows={3}
          />
        </div>

        <div>
          <Label>Fonte de Dados</Label>
          <Select value={config.dataSource} onValueChange={(value) => onChange({ ...config, dataSource: value })}>
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Excel">Excel</SelectItem>
              <SelectItem value="SQL Server">SQL Server</SelectItem>
              <SelectItem value="Azure SQL">Azure SQL</SelectItem>
              <SelectItem value="SharePoint">SharePoint</SelectItem>
              <SelectItem value="Web API">Web API</SelectItem>
              <SelectItem value="Oracle">Oracle</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Tipo de Relatório</Label>
          <Select value={config.reportType} onValueChange={(value) => onChange({ ...config, reportType: value })}>
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Dashboard">Dashboard</SelectItem>
              <SelectItem value="Relatório Detalhado">Relatório Detalhado</SelectItem>
              <SelectItem value="Scorecard">Scorecard</SelectItem>
              <SelectItem value="Análise Ad-hoc">Análise Ad-hoc</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Tema</Label>
          <Select value={config.theme} onValueChange={(value) => onChange({ ...config, theme: value })}>
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Corporate">Corporate</SelectItem>
              <SelectItem value="Modern">Modern</SelectItem>
              <SelectItem value="Colorful">Colorful</SelectItem>
              <SelectItem value="Executive">Executive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicInfoSection;
