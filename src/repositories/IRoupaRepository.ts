
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
    listar(): Promise<any[]>;
    buscarPorId(id: string): Promise<any[] | null>
    buscarPorFiltro(filtros: FiltroRoupaDTO): Promise<any[]>; 
    cadastrar(dados: RoupaDTO): Promise<any[]>;
    atualizaTodos(id: string, dados: RoupaDTO): Promise<any[]>;
    atualizaParcial(id: string, dados:Partial<RoupaDTO>): Promise<any[]>;
    deletar(id: string): Promise<boolean>;
    
}