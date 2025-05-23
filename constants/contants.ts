export class ProfileType {
    /**
     * Representa diferentes tipos de Perfis de Usuários.
     *
     * ADMIN: Administrador, usuário com permissões de administrador.
     * DEVELOPER: Desenvolvedor, usuário com permissões de desenvolvedor.
     * GARDENER: Hortelão/Produtor, usuário com permissões de hortelão/produtor.
     */
    static readonly ADMIN = 1;
    static readonly DEVELOPER = 2;
    static readonly GARDENER = 3;

    static readonly PROFILE_TYPE_CHOICES = [
        { value: ProfileType.ADMIN, label: "Administrador" },
        { value: ProfileType.DEVELOPER, label: "Desenvolvedor" },
        { value: ProfileType.GARDENER, label: "Hortelão/Produtor" },
    ];
}

export class Status {
    /**
     * Representa diferentes status de objetos.
     *
     * ACTIVE: Objeto ativo.
     * INACTIVE: Objeto inativo.
     */
    static readonly ACTIVE = 1;
    static readonly INACTIVE = 2;

    static readonly STATUS_CHOICES = [
        { value: Status.ACTIVE, label: "Ativo" },
        { value: Status.INACTIVE, label: "Inativo" },
    ];
}

export class SignatureValidationMonths {
    /**
     * Representa os meses de validade da assinatura.
     *
     * ONE_MONTH: Um mês de validade.
     * THREE_MONTHS: Três meses de validade.
     * SIX_MONTHS: Seis meses de validade.
     * TWELVE_MONTHS: Doze meses de validade.
     */
    static readonly ONE_MONTH = 1;
    static readonly THREE_MONTHS = 3;
    static readonly SIX_MONTHS = 6;
    static readonly TWELVE_MONTHS = 12;

    static readonly SIGNATURE_VALIDATION_MONTHS_CHOICES = [
        { value: SignatureValidationMonths.ONE_MONTH, label: "Um mês" },
        { value: SignatureValidationMonths.THREE_MONTHS, label: "Três meses" },
        { value: SignatureValidationMonths.SIX_MONTHS, label: "Seis meses" },
        { value: SignatureValidationMonths.TWELVE_MONTHS, label: "Doze meses" },
    ];
}

export class LevelOfEducation {
    /**
     * Representa os níveis de escolaridade.
     *
     * BASIC: Educação infantil e Ensino Fundamental.
     * HIGH_SCHOOL: Ensino Médio.
     * UNDERGRADUATE: Graduação.
     * POSTGRADUATE: Pós-Graduação.
     */
    static readonly BASIC = 1;
    static readonly HIGH_SCHOOL = 2;
    static readonly UNDERGRADUATE = 3;
    static readonly POSTGRADUATE = 4;

    static readonly LEVEL_OF_EDUCATION_CHOICES = [
        { value: LevelOfEducation.BASIC, label: "Ensino Fundamental" },
        { value: LevelOfEducation.HIGH_SCHOOL, label: "Ensino Médio" },
        { value: LevelOfEducation.UNDERGRADUATE, label: "Graduação" },
        { value: LevelOfEducation.POSTGRADUATE, label: "Pós-Graduação" },
    ];
}

export class Gender{
    /**
     * Object representando os gêneros.
     * 
     * Atributos:
     * - MALE (int): Masculino.
     * - FEMALE (int): Feminino.
     * - OTHER (int): Outro.
    */
    
    static readonly MALE = 1;
    static readonly FEMALE = 2;
    static readonly OTHER = 3;
    
    static readonly GENDER_CHOICES = [
        { value: Gender.MALE, label: "Masculino"},
        { value: Gender.FEMALE, label: "Feminino"},
        { value: Gender.OTHER, label: "Outro"},
    ];
}