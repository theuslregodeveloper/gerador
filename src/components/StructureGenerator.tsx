
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, GitBranch, Calculator, Table } from "lucide-react";
import { ProjectConfig } from "./PowerBIGenerator";

interface StructureGeneratorProps {
  config: ProjectConfig;
}

const StructureGenerator = ({ config }: StructureGeneratorProps) => {
  // Gerar estrutura de tabelas
  const generateTables = () => {
    const tables = [];
    
    if (config.dimensions.length > 0) {
      tables.push({
        name: "DimPrincipal",
        type: "Dimension",
        columns: config.dimensions.map(dim => ({
          name: dim,
          type: "Text",
          isKey: dim === config.dimensions[0]
        }))
      });
    }
    
    if (config.measures.length > 0) {
      tables.push({
        name: "FactDados",
        type: "Fact",
        columns: [
          ...config.dimensions.map(dim => ({
            name: `${dim}Key`,
            type: "Integer",
            isKey: false
          })),
          ...config.measures.map(measure => ({
            name: measure,
            type: "Decimal",
            isKey: false
          }))
        ]
      });
    }
    
    return tables;
  };

  // Gerar relacionamentos
  const generateRelationships = () => {
    const relationships = [];
    
    if (config.dimensions.length > 0 && config.measures.length > 0) {
      config.dimensions.forEach(dim => {
        relationships.push({
          from: "DimPrincipal",
          fromColumn: dim,
          to: "FactDados",
          toColumn: `${dim}Key`,
          cardinality: "1:*"
        });
      });
    }
    
    return relationships;
  };

  // Gerar medidas DAX
  const generateDAXMeasures = () => {
    return config.measures.map(measure => {
      const measureName = measure.replace(/\s+/g, '');
      let daxFormula = `SUM(FactDados[${measure}])`;
      
      // Personalizar fórmulas baseado no nome da medida
      if (measure.toLowerCase().includes('média') || measure.toLowerCase().includes('media')) {
        daxFormula = `AVERAGE(FactDados[${measure}])`;
      } else if (measure.toLowerCase().includes('contagem') || measure.toLowerCase().includes('count')) {
        daxFormula = `COUNT(FactDados[${measure}])`;
      } else if (measure.toLowerCase().includes('percentual') || measure.toLowerCase().includes('%')) {
        daxFormula = `DIVIDE(SUM(FactDados[${measure}]), SUM(FactDados[Total]), 0) * 100`;
      }
      
      return {
        name: measureName,
        formula: `${measureName} = ${daxFormula}`,
        formatString: measure.toLowerCase().includes('valor') || measure.toLowerCase().includes('preço') ? 
          '"R$ "#,##0.00' : '#,##0.00'
      };
    });
  };

  const tables = generateTables();
  const relationships = generateRelationships();
  const daxMeasures = generateDAXMeasures();

  if (config.dimensions.length === 0 && config.measures.length === 0) {
    return (
      <div className="text-center py-8">
        <Database className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-600 mb-2">
          Estrutura Power BI
        </h3>
        <p className="text-gray-500">
          Adicione dimensões e medidas para gerar a estrutura do projeto
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Estrutura Power BI Gerada</h2>
        <p className="text-gray-600">Modelo de dados baseado na sua configuração</p>
      </div>

      {/* Tabelas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Table className="h-5 w-5 text-blue-600" />
            Tabelas ({tables.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {tables.map((table, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <h4 className="font-semibold text-gray-800">{table.name}</h4>
                <Badge variant={table.type === 'Dimension' ? 'default' : 'secondary'}>
                  {table.type}
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {table.columns.map((column, colIndex) => (
                  <div key={colIndex} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                    <span className="font-medium text-sm">{column.name}</span>
                    <Badge variant="outline" className="text-xs">{column.type}</Badge>
                    {column.isKey && <Badge variant="destructive" className="text-xs">PK</Badge>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Relacionamentos */}
      {relationships.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitBranch className="h-5 w-5 text-green-600" />
              Relacionamentos ({relationships.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {relationships.map((rel, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{rel.from}</Badge>
                    <span className="text-sm text-gray-600">[{rel.fromColumn}]</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{rel.cardinality}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{rel.to}</Badge>
                    <span className="text-sm text-gray-600">[{rel.toColumn}]</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Medidas DAX */}
      {daxMeasures.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-purple-600" />
              Medidas DAX ({daxMeasures.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {daxMeasures.map((measure, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-gray-800">{measure.name}</h4>
                    <Badge variant="outline">{measure.formatString}</Badge>
                  </div>
                  <code className="block bg-gray-900 text-green-400 p-3 rounded text-sm font-mono">
                    {measure.formula}
                  </code>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Visualizações Sugeridas */}
      {config.visualizations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-orange-600" />
              Layout de Visualizações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {config.visualizations.map((viz, index) => (
                <div key={index} className="border rounded-lg p-4 bg-gradient-to-br from-blue-50 to-purple-50">
                  <h4 className="font-semibold text-gray-800 mb-2">{viz}</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>
                      <strong>Dimensões:</strong> {config.dimensions.slice(0, 2).join(', ') || 'Nenhuma'}
                    </div>
                    <div>
                      <strong>Medidas:</strong> {config.measures.slice(0, 2).join(', ') || 'Nenhuma'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StructureGenerator;
