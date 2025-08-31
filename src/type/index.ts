export type ActionResult = {
  error: string;
};

export interface EditPageProp {
  params: Promise<{ id: string }>;
}

export interface DeletePageProps {
  params: Promise<{ id: string }>;
}
