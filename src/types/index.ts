type Next = () => void | Promise<void>;
type RequestFunction = { req: Request; res: Response; next: Next };
