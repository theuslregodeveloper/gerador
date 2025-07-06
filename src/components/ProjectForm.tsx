
import { ProjectConfig } from "./PowerBIGenerator";
import BasicInfoSection from "./project-form/BasicInfoSection";
import DataStructureSection from "./project-form/DataStructureSection";
import FileUploadSection from "./project-form/FileUploadSection";
import VisualizationsSection from "./project-form/VisualizationsSection";

interface ProjectFormProps {
  config: ProjectConfig;
  onChange: (config: ProjectConfig) => void;
}

const ProjectForm = ({ config, onChange }: ProjectFormProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Configuração do Projeto</h2>
        <p className="text-gray-600">Defina os parâmetros do seu projeto Power BI</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <BasicInfoSection config={config} onChange={onChange} />
        <DataStructureSection config={config} onChange={onChange} />
      </div>

      <FileUploadSection config={config} onChange={onChange} />
      <VisualizationsSection config={config} onChange={onChange} />
    </div>
  );
};

export default ProjectForm;
