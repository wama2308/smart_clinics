const selectRegisterUser = 
    [
      { value: 'SI', label: 'SI' },
      { value: 'NO', label: 'NO' },

    ];  
	/*CARGOS*/
export const InitalState = {

	/*CARGOS*/
    cargo: '',
    cargoError: '',
    cargoInvalid: false,
    descripcion: '',
    descripcionError: '',
    descripcionInvalid: false,
    loading:'show',   
	/*CARGOS*/

	/*PERSONAL*/
	/*SELECTS*/       
    arrayTypeIdentity: [],
    arrayTypeIdentitySelect: [],
    selectedTypeIdentity: 0,

    arraySex:[],
    arraySexSelect: null,
    divSexSelect: '',
    sexSelectError: '',

    arrayCharges:[],
    arrayChargesSelect: null,
    divChargesSelect: '',
    chargesSelectError: '',

    arrayPaisSelect: null,
    divPaisSelect: '',
    paisSelectError: '',

    arrayProvince:[],
    arrayProvinceSelect: null,
    divProvinceSelect: '',
    provinceSelectError: '',

    arrayDistrict:[],
    arrayDistrictSelect: null,
    divDistrictSelect: '',
    DistrictSelectError: '',

    arrayEstateCivil:[],
    arrayEstatetCivilSelect: null,
    divEstateCivilSelect: '',
    estateCivilSelectError: '',

    arrayEspecialization:[],
    arrayEspecializationSelect: null,
    divEspecializationSelect: '',
    especializationSelectError: '',

    arrayProfession:[],
    arrayProfessionSelect: null,
    divProfessionSelect: '',
    professionSelectError: '',

    arrayRegisterUser: selectRegisterUser,
    arrayRegisterUserSelect: null,
    divRegisterUserSelect: '',
    registerUserSelectError: '',

    arrayUsersSelect: null,
    divUsersSelect:'',
    divUsersSelectError:'',

    disabledRegisterUser: false,
    disabledSelectUser: false,

    divSucursalesSelect:'',
    divSucursalesSelectError:'',
    arraySucursalesSelect:null,

    /*SELECTS*/   

     /*INPUTS*/    
    dni: '',
    dniInvalid: false,
    dniError: '', 

    names: '',
    namesError: '',
    namesInvalid: false,

    surnames: '',
    surnamesError: '',
    surnamesInvalid: false,

    direccion: '',
    direccionError: '',
    direccionInvalid: false,

    tagsTelefonos: [],  
    divTagsTelefonos: '',
    tagsTelefonosError: '',

    tagsEmails: [],  
    divTagsEmails: '',
    tagsEmailsError: '',

    birthDate: new Date(),
    divBirthDate:'',
    birthDateError:'',

    entryDate: new Date(),
    divEntryDate:'',
    entryDateError:'',

    fotoInvalid: false,
    fotoError: '',            
    foto: null,

    modal:false,
    modalHeader: '',
    modalFooter: '',
    action: '',
    disabled: '',
    disabledEmail: '',
    showHide: '',
    option:0,
    position: 0,
    emailUserSelect: '',
    checkedA: false,    
    userIdEdit: ''
	/*PERSONAL*/
}