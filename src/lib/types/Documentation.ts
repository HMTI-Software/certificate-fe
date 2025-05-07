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
  image?: IDocumentationImage[];
  list?: IDocumentationSectionContentList[];
  span?: IDocumentationSpan[];
}

export interface IDocumentationSectionContentList {
  title?: string;
  description?: string;
  image?: IDocumentationImage[];
  list?: IDocumentationSectionContentList[];
  span?: IDocumentationSpan[];
}

export interface IDocumentationImage {
  url: string;
  alt: string;
  className?: string;
  bordered?: boolean;
  description?: string;
}

export interface IDocumentationSpan {
  description: string;
  color: string;
}
