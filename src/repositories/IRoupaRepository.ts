
export interface RoupaDTO {
    id?: string;
    name: string;
    category: string;
    size: string;
    color: string;
    price: number;
    cover: string | undefined;
}

export interface FiltroRoupaDTO {
    nome?: string;
    categoria?: string;
    cor?: string;
    tamanho?: string;
    preco?: string;
}

export interface IRoupaRepository{
    listar(): Promise<RoupaDTO[]>;
    buscarPorId(id: string): Promise<RoupaDTO | null>
    buscarPorFiltro(filtros: FiltroRoupaDTO): Promise<RoupaDTO[]>; 
    cadastrar(dados: RoupaDTO): Promise<RoupaDTO>;
    atualizaTodos(id: string, dados: RoupaDTO): Promise<RoupaDTO | null>;
    atualizaParcial(id: string, dados:Partial<RoupaDTO>): Promise<RoupaDTO | null>;
    deletar(id: string): Promise<boolean>;
    
}