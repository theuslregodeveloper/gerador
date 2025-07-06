
import { ProjectConfig } from "@/components/PowerBIGenerator";
import { toast } from "@/hooks/use-toast";

export interface PowerBIProjectData {
  version: string;
  config: ProjectConfig;
  metadata: {
    created: string;
    generator: string;
    fileSize: string;
  };
}

export const generatePowerBIProject = async (config: ProjectConfig): Promise<void> => {
  try {
    // Gerar estrutura do projeto
    const projectData: PowerBIProjectData = {
      version: "1.0",
      config,
      metadata: {
        created: new Date().toISOString(),
        generator: "Gerador Power BI v1.0",
        fileSize: "2.1 MB"
      }
    };

    // Gerar conteúdo do arquivo PBIX (simulado)
    const pbixContent = generatePBIXContent(projectData);
    
    // Criar e baixar o arquivo
    const blob = new Blob([pbixContent], { 
      type: 'application/vnd.ms-powerbi' 
    });
    
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${config.projectName || 'projeto-powerbi'}.pbix`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    window.URL.revokeObjectURL(url);

    // Exibir notificação de sucesso
    toast({
      title: "Download Iniciado!",
      description: `O arquivo ${config.projectName || 'projeto-powerbi'}.pbix foi baixado com sucesso.`,
    });

    console.log('Projeto Power BI gerado:', projectData);
    
  } catch (error) {
    console.error('Erro ao gerar projeto Power BI:', error);
    toast({
      title: "Erro no Download",
      description: "Ocorreu um erro ao gerar o arquivo. Tente novamente.",
      variant: "destructive",
    });
  }
};

const generatePBIXContent = (projectData: PowerBIProjectData): string => {
  const { config } = projectData;
  
  // Estrutura básica de um projeto Power BI (formato JSON simplificado)
  const pbixStructure = {
    name: config.projectName,
    description: config.description,
    dataSource: {
      type: config.dataSource,
      connectionString: getConnectionString(config.dataSource)
    },
    model: {
      tables: generateTables(config),
      relationships: generateRelationships(config),
      measures: generateMeasures(config),
      calculations: generateCalculations(config)
    },
    report: {
      pages: generateReportPages(config),
      theme: config.theme,
      layout: getLayoutByType(config.reportType)
    },
    metadata: projectData.metadata
  };

  return JSON.stringify(pbixStructure, null, 2);
};

const getConnectionString = (dataSource: string): string => {
  const connections: Record<string, string> = {
    "Excel": "Provider=Microsoft.ACE.OLEDB.12.0;Data Source={file_path};Extended Properties='Excel 12.0;HDR=YES;'",
    "SQL Server": "Server={server};Database={database};Trusted_Connection=true;",
    "Azure SQL": "Server=tcp:{server}.database.windows.net,1433;Database={database};Authentication=Active Directory Integrated;",
    "SharePoint": "Url={sharepoint_url};",
    "Web API": "BaseUrl={api_base_url};",
    "Oracle": "Data Source={server}:{port}/{service_name};User Id={username};Password={password};"
  };
  
  return connections[dataSource] || connections["Excel"];
};

const generateTables = (config: ProjectConfig) => {
  const tables = [];
  
  // Tabela principal baseada nas dimensões
  if (config.dimensions.length > 0) {
    tables.push({
      name: "DimPrincipal",
      columns: config.dimensions.map(dim => ({
        name: dim,
        dataType: "String",
        isKey: dim === config.dimensions[0]
      }))
    });
  }
  
  // Tabela de fatos baseada nas medidas
  if (config.measures.length > 0) {
    tables.push({
      name: "FactDados",
      columns: [
        ...config.dimensions.map(dim => ({
          name: `${dim}Key`,
          dataType: "Integer",
          isKey: false
        })),
        ...config.measures.map(measure => ({
          name: measure,
          dataType: "Decimal",
          isKey: false
        }))
      ]
    });
  }
  
  return tables;
};

const generateRelationships = (config: ProjectConfig) => {
  const relationships = [];
  
  if (config.dimensions.length > 0 && config.measures.length > 0) {
    config.dimensions.forEach(dim => {
      relationships.push({
        fromTable: "DimPrincipal",
        fromColumn: dim,
        toTable: "FactDados",
        toColumn: `${dim}Key`,
        cardinality: "OneToMany"
      });
    });
  }
  
  return relationships;
};

const generateMeasures = (config: ProjectConfig) => {
  return config.measures.map(measure => ({
    name: measure,
    expression: `SUM(FactDados[${measure}])`,
    formatString: measure.toLowerCase().includes('valor') || measure.toLowerCase().includes('preço') ? 
      '"R$ "#,##0.00' : '#,##0.00'
  }));
};

const generateCalculations = (config: ProjectConfig) => {
  const calculations = [];
  
  // Adicionar cálculos comuns baseados no tipo de relatório
  if (config.reportType === "Dashboard") {
    calculations.push(
      {
        name: "Total Geral",
        expression: config.measures.length > 0 ? 
          `SUM(${config.measures.map(m => `[${m}]`).join(' + ')})` : "0"
      },
      {
        name: "Média Período",
        expression: config.measures.length > 0 ? 
          `AVERAGE(${config.measures[0] ? `[${config.measures[0]}]` : "0"})` : "0"
      }
    );
  }
  
  return calculations;
};

const generateReportPages = (config: ProjectConfig) => {
  const pages = [];
  
  // Página principal
  const mainPage = {
    name: "Página Principal",
    visuals: []
  };
  
  // Adicionar visualizações baseadas na seleção
  config.visualizations.forEach((viz, index) => {
    mainPage.visuals.push({
      type: viz,
      position: {
        x: (index % 3) * 300,
        y: Math.floor(index / 3) * 250,
        width: 280,
        height: 230
      },
      data: {
        dimensions: config.dimensions.slice(0, 2),
        measures: config.measures.slice(0, 2)
      }
    });
  });
  
  pages.push(mainPage);
  
  // Página de detalhes se for relatório detalhado
  if (config.reportType === "Relatório Detalhado") {
    pages.push({
      name: "Detalhes",
      visuals: [
        {
          type: "Tabela",
          position: { x: 0, y: 0, width: 1200, height: 600 },
          data: {
            dimensions: config.dimensions,
            measures: config.measures
          }
        }
      ]
    });
  }
  
  return pages;
};

const getLayoutByType = (reportType: string) => {
  const layouts: Record<string, any> = {
    "Dashboard": {
      type: "grid",
      columns: 3,
      spacing: 10,
      background: "white"
    },
    "Relatório Detalhado": {
      type: "vertical",
      spacing: 5,
      background: "white"
    },
    "Scorecard": {
      type: "card",
      alignment: "center",
      background: "gradient"
    },
    "Análise Ad-hoc": {
      type: "flexible",
      background: "white"
    }
  };
  
  return layouts[reportType] || layouts["Dashboard"];
};
