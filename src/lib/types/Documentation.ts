export interface IDocumentationSidebar {
  name: string;
  id: string;
  type: "heading" | "subheading";
}

export interface IDocumentationSection {
  title: string;
  id: string;
  description?: string;
  content?: IDocumentationSectionContent[];
}

export interface IDocumentationSectionContent {
  title?: string;
  id?: string;
  type: "main" | "sub";
  description?: string;
  image?: {
    url: string;
    alt: string;
    className?: string;
    bordered?: boolean;
  };
  list?: IDocumentationSectionContentList[];
}

export interface IDocumentationSectionContentList {
  description?: string;
  image?: {
    url: string;
    alt: string;
    className?: string;
    bordered?: boolean;
  };
  list?: IDocumentationSectionContentList[];
  span?: IDocumentationSpan[];
}

export interface IDocumentationSpan {
  description: string;
  color: string;
}
