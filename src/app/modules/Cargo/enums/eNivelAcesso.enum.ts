export enum ENivelAcesso {
    administrador = 1,
    financeiro = 2,
    usuario = 3
}

export const ENivelAcessoDescricao = new Map<number, string>([
    [ENivelAcesso.administrador, 'Administrador'],
    [ENivelAcesso.financeiro, 'Financeiro'],
    [ENivelAcesso.usuario, 'Usuário'],
]);