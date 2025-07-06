
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Download, FileText, Settings, Database } from "lucide-react";
import ProjectForm from "./ProjectForm";
import ProjectPreview from "./ProjectPreview";
import StructureGenerator from "./StructureGenerator";

export interface ProjectConfig {
  projectName: string;
  description: string;
  dataSource: string;
  reportType: string;
  dimensions: string[];
  measures: string[];
  visualizations: string[];
  theme: string;
}

const PowerBIGenerator = () => {
  const [projectConfig, setProjectConfig] = useState<ProjectConfig>({
    projectName: "",
    description: "",
    dataSource: "Excel",
    reportType: "Dashboard",
    dimensions: [],
    measures: [],
    visualizations: [],
    theme: "Corporate"
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-yellow-500 p-4 rounded-2xl shadow-lg">
            <BarChart3 className="h-12 w-12 text-white" />
          </div>
        </div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-700 to-yellow-600 bg-clip-text text-transparent mb-4">
          Gerador de Projetos Power BI
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Crie projetos profissionais do Power BI personalizados com templates otimizados e prontos para download
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <Tabs defaultValue="configure" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="configure" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Configurar
            </TabsTrigger>
            <TabsTrigger value="structure" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Estrutura
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Visualizar
            </TabsTrigger>
            <TabsTrigger value="download" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download
            </TabsTrigger>
          </TabsList>

          <TabsContent value="configure" className="space-y-6">
            <Card className="p-8 shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <ProjectForm 
                config={projectConfig} 
                onChange={setProjectConfig} 
              />
            </Card>
          </TabsContent>

          <TabsContent value="structure" className="space-y-6">
            <Card className="p-8 shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <StructureGenerator config={projectConfig} />
            </Card>
          </TabsContent>

          <TabsContent value="preview" className="space-y-6">
            <Card className="p-8 shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <ProjectPreview config={projectConfig} />
            </Card>
          </TabsContent>

          <TabsContent value="download" className="space-y-6">
            <Card className="p-8 shadow-lg border-0 bg-white/70 backdrop-blur-sm text-center">
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-100 to-yellow-100 p-8 rounded-xl">
                  <Download className="h-16 w-16 mx-auto text-blue-600 mb-4" />
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Projeto Pronto para Download!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Seu projeto "{projectConfig.projectName || 'Projeto Power BI'}" foi gerado com sucesso
                  </p>
                  <ProjectPreview config={projectConfig} downloadMode={true} />
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PowerBIGenerator;
