import { Map, List } from 'immutable';

export default Map({
  email: "wilfredomedina11@gmail.com",
  enabled: 1,
  profile_is_default: "internal",
  profile: [
    {
      name: "internal",
      medical_center: [
        {
          _id: "5c34f3437464200aee61bd27",
          name: "Santa Rosalia",
          is_default: 1,
          branch_office: [
            {
              _id: 0,
              name: "Sucursal",
              is_default: 0,
              permission: [
                {
                  _id: "MASTER",
                  name: "MASTER",
                  type: 0
                }
              ]
            }
          ],
          active: true,
          created_at: "2019-01-08T19:03:40.138Z",
          created_by: "0",
          updated_at: "2019-01-08T19:03:40.138Z",
          updated_by: "0"
        }
      ]
    }
  ],
  secret_question1: "¿Super heroe favorito?",
  secret_question2: "¿Deporte favorito?",
  secret_question3: "¿Primer vehiculo(marca)?",
  secret_answer1: "batman",
  secret_answer2: "beisbol",
  secret_answer3: "ford",

})