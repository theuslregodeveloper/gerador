
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Database, BarChart3, Eye } from "lucide-react";
import { ProjectConfig } from "./PowerBIGenerator";
import { generatePowerBIProject } from "@/utils/powerBIUtils";

interface ProjectPreviewProps {
  config: ProjectConfig;
  downloadMode?: boolean;
}

const ProjectPreview = ({ config, downloadMode = false }: ProjectPreviewProps) => {
  const handleDownload = () => {
    generatePowerBIProject(config);
  };

  if (!config.projectName && !downloadMode) {
    return (
      <div className="text-center py-12">
        <Eye className="h-16 w-16 mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          Preview do Projeto
        </h3>
        <p className="text-gray-500">
          Configure seu projeto na aba anterior para ver o preview aqui
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {!downloadMode && (
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Preview do Projeto</h2>
          <p className="text-gray-600">Visualize como ficará seu projeto Power BI</p>
        </div>
      )}

      <div className="grid gap-6">
        {/* Informações do Projeto */}
        <Card className="border-l-4 border-l-blue-600">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              {config.projectName || "Projeto PowerBI"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {config.description && (
              <p className="text-gray-700">{config.description}</p>
            )}
            
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Fonte de Dados</h4>
                <Badge variant="outline" className="flex items-center gap-1 w-fit">
                  <Database className="h-3 w-3" />
                  {config.dataSource}
                </Badge>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Tipo</h4>
                <Badge variant="outline">{config.reportType}</Badge>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Tema</h4>
                <Badge variant="outline">{config.theme}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Estrutura de Dados */}
        {(config.dimensions.length > 0 || config.measures.length > 0) && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-green-600" />
                Estrutura de Dados
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {config.dimensions.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Dimensões ({config.dimensions.length})</h4>
                  <div className="flex flex-wrap gap-2">
                    {config.dimensions.map((dim, index) => (
                      <Badge key={index} variant="secondary">{dim}</Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {config.measures.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Medidas ({config.measures.length})</h4>
                  <div className="flex flex-wrap gap-2">
                    {config.measures.map((measure, index) => (
                      <Badge key={index} variant="secondary">{measure}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Visualizações */}
        {config.visualizations.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-purple-600" />
                Visualizações ({config.visualizations.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {config.visualizations.map((viz, index) => (
                  <Badge key={index} variant="outline" className="justify-center p-2">
                    {viz}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Botão de Download */}
        <div className="text-center pt-6">
          <Button 
            onClick={handleDownload} 
            className="bg-gradient-to-r from-blue-600 to-yellow-500 hover:from-blue-700 hover:to-yellow-600 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            size="lg"
          >
            <Download className="h-5 w-5 mr-2" />
            Baixar Projeto Power BI (.pbix)
          </Button>
          <p className="text-sm text-gray-500 mt-2">
            O arquivo será baixado com todas as configurações definidas
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectPreview;
