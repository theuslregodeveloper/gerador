
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileSpreadsheet, Database, X } from "lucide-react";
import { ProjectConfig } from "../PowerBIGenerator";

interface FileUploadSectionProps {
  config: ProjectConfig;
  onChange: (config: ProjectConfig) => void;
}

const FileUploadSection = ({ config, onChange }: FileUploadSectionProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, fileType: string) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      setUploadedFiles(prev => [...prev, ...newFiles]);
      
      // Atualizar a fonte de dados baseada no tipo de arquivo
      if (fileType === 'excel' && !config.dataSource.includes('Excel')) {
        onChange({ ...config, dataSource: 'Excel' });
      }
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-blue-700 flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload de Arquivos de Dados
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Upload Excel */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
            <FileSpreadsheet className="h-12 w-12 mx-auto text-green-600 mb-4" />
            <h4 className="font-semibold text-gray-800 mb-2">Arquivo Excel</h4>
            <p className="text-sm text-gray-600 mb-4">
              Faça upload de arquivos .xlsx, .xls
            </p>
            <Button variant="outline" className="relative">
              <Upload className="h-4 w-4 mr-2" />
              Selecionar Excel
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept=".xlsx,.xls"
                onChange={(e) => handleFileUpload(e, 'excel')}
                multiple
              />
            </Button>
          </div>

          {/* Upload Outros Formatos */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
            <Database className="h-12 w-12 mx-auto text-blue-600 mb-4" />
            <h4 className="font-semibold text-gray-800 mb-2">Outros Formatos</h4>
            <p className="text-sm text-gray-600 mb-4">
              CSV, JSON, XML e outros
            </p>
            <Button variant="outline" className="relative">
              <Upload className="h-4 w-4 mr-2" />
              Selecionar Arquivo
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept=".csv,.json,.xml,.txt"
                onChange={(e) => handleFileUpload(e, 'other')}
                multiple
              />
            </Button>
          </div>
        </div>

        {/* Lista de Arquivos Carregados */}
        {uploadedFiles.length > 0 && (
          <div className="mt-6">
            <Label className="text-sm font-semibold text-gray-800">Arquivos Carregados:</Label>
            <div className="mt-2 space-y-2">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileSpreadsheet className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-800">{file.name}</p>
                      <p className="text-sm text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FileUploadSection;
