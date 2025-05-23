export default class ApiError {
    static readonly INVALID_CREDENTIALS = 'No active account found with the given credentials';
    static readonly USERNAME_ALREADY_EXISTS = 'Username already exists';
    static readonly EMAIL_ALREADY_EXISTS = 'Email already exists';
    static readonly DOCUMENT_ALREADY_EXISTS = 'Document already exists';

    static readonly ERROR_CHOICES =[
        {value: ApiError.INVALID_CREDENTIALS, label: 'Nenhuma conta ativa encontrada com as credenciais fornecidas'},
        {value: ApiError.USERNAME_ALREADY_EXISTS, label: 'Nome de usuário já existe'},
        {value: ApiError.EMAIL_ALREADY_EXISTS, label: 'Email já existe'},
        {value: ApiError.DOCUMENT_ALREADY_EXISTS, label: 'Documento já cadastrado'},
    ]
}