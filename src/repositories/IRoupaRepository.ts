
export interface RoupaDTO {
    id?: string;
    name: String;
    category: String;
    size: String;
    color: String;
    price: number;
    cover: String | undefined;
}

export interface FiltroRoupaDTO {
    nome?: String;
    categoria?: String;
    cor?: String;
    tamanho?: String;
    preco?: String;
}

export interface IRoupaRepository{
    listar(): Promise<RoupaDTO[]>;
    buscarPorId(id: string): Promise<RoupaDTO[] | null>
    buscarPorFiltro(filtros: FiltroRoupaDTO): Promise<RoupaDTO[]>; 
    cadastrar(dados: RoupaDTO): Promise<RoupaDTO>;
    atualizaTodos(id: string, dados: RoupaDTO): Promise<RoupaDTO | null>;
    atualizaParcial(id: string, dados:Partial<RoupaDTO>): Promise<RoupaDTO | null>;
    deletar(id: string): Promise<boolean>;
    
}