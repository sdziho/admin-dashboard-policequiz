import {
  Datagrid,
  List,
  Filter,
  TextField,
  TextInput,
  EditButton,
  DeleteButton,
  ReferenceField,
  Edit,
  SimpleForm,
  required,
  ReferenceInput,
  SelectInput,
  ArrayField,
  FormDataConsumer,
  ReferenceArrayField,
  ArrayInput,
  SimpleFormIterator,
  BooleanInput,
  useGetList,
  NumberInput,
  SingleFieldList,
  useNotify,
  useRedirect,
  AutocompleteArrayInput,
  Create,
} from "react-admin";
import Grid from "@material-ui/core/Grid";
import { useNavigate, useLocation } from "react-router-dom";

const QuestionsFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Pretraga" source="question" alwaysOn />
  </Filter>
);

export const QuestionsList = (props) => (
  <List {...props} filters={<QuestionsFilter />}>
    <Datagrid>
      <ReferenceArrayField reference="categories" source="categories">
        <SingleFieldList>
          <TextField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>
      <TextField source="question" label="Pitanje" />
      <EditButton width="10%" label="Uredi" />
      <DeleteButton width="10%" label="Obriši" redirect={false} />
    </Datagrid>
  </List>
);

export const QuestionsEdit = (props) => {
  const { data, total, isLoading, error } = useGetList("categories", {
    sort: { field: "createdAt", order: "DESC" },
  });
  console.log(data);
  const subctg = useGetList("subcategories", {
    sort: { field: "createdAt", order: "DESC" },
  });
  console.log("potkategorije", subctg.data);
  return (
    <Edit {...props}>
      <SimpleForm>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextInput
              source="question"
              label="Pitanje"
              validate={[required()]}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            {!isLoading && (
              <AutocompleteArrayInput
                validate={[required()]}
                label="Kategorije"
                source="categories"
                choices={data}
              />
            )}
          </Grid>
          <Grid item xs={6}>
            {!subctg.isLoading && (
              <AutocompleteArrayInput
                validate={[required()]}
                label="Potkategorije"
                source="subcategories"
                choices={subctg.data}
              />
            )}
          </Grid>
        </Grid>
        <ArrayInput source="answers" validate={[required()]} label="Odgovori">
          <SimpleFormIterator>
            <TextInput
              label="Odgovor"
              validate={[required()]}
              source="answer"
              fullWidth
            />
            <BooleanInput label="Tačan" source="correctAnswer" />
          </SimpleFormIterator>
        </ArrayInput>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <BooleanInput label="Za inspektora" source="isForInspector" />
          </Grid>
          <Grid item xs={2}>
            <BooleanInput label="Za policajca" source="isForPoliceman" />
          </Grid>
        </Grid>
      </SimpleForm>
    </Edit>
  );
};

export const QuestionsCreate = (props) => {
  const notify = useNotify();
  const redirect = useRedirect();
  const navigate = useNavigate();
  const location = useLocation();

  const onSuccess = (data) => {
    notify(`Pitanje uspješno kreirano!`);
    navigate(0, { newlyCreated: true });
  };

  const { data, total, isLoading, error } = useGetList("categories", {
    sort: { field: "createdAt", order: "DESC" },
  });
  const subctg = useGetList("subcategories", {
    sort: { field: "createdAt", order: "DESC" },
  });
  console.log(subctg);
  const getQuestions = useGetList("questions", {
    sort: { field: "createdAt", order: "DESC" },
  });

  const validateUserCreation = (values) => {
    const errors = {};
    console.log("ovo su values", values);
    if (values.answers.length < 2) {
      errors.answers = "Morate unijeti minimalno 2 odgovara";
    }
    if (values.answers.length > 0) {
      let imaBaremJedanTacan = false;
      let imaViseTacnih = false;
      values.answers.forEach((answer, index) => {
        if (answer.answer.length === 0) {
          errors.answers = "Odgovor ne smije biti prazan";
        }
        if (answer.correctAnswer) {
          if (!imaBaremJedanTacan) {
            imaBaremJedanTacan = true;
          } else {
            imaViseTacnih = true;
          }
        }
      });
      if (!imaBaremJedanTacan) {
        errors.answers = "Morate unijeti barem jedan tačan odgovor";
      }
      if (imaViseTacnih) {
        errors.answers = "Samo jedan odgovor može biti tačan";
      }
    }
    if (values.categories.length === 0) {
      errors.categories = "Morate unijeti minimalno 1 kategoriju";
    }
    return errors;
  };

  return (
    <Create {...props} mutationOptions={{ onSuccess }}>
      <SimpleForm validate={validateUserCreation}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextInput
              source="question"
              label="Pitanje"
              validate={[required()]}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            {!isLoading && (
              <AutocompleteArrayInput
                validate={[required()]}
                label="Kategorije"
                source="categories"
                defaultValue={getQuestions.data[0].categories}
                choices={data}
              />
            )}
          </Grid>
          <Grid item xs={6}>
            {!subctg.isLoading && (
              <AutocompleteArrayInput
                validate={[required()]}
                label="Potkategorije"
                source="subcategories"
                defaultValue={getQuestions.data[0].subcategories}
                choices={subctg.data}
              />
            )}
          </Grid>
        </Grid>
        <ArrayInput source="answers" label="Odgovori">
          <SimpleFormIterator>
            <TextInput label="Odgovor" source="answer" />
            <BooleanInput label="Tačan" source="correctAnswer" />
          </SimpleFormIterator>
        </ArrayInput>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <BooleanInput
              label="Za inspektora"
              source="isForInspector"
              defaultValue
            />
          </Grid>
          <Grid item xs={2}>
            <BooleanInput
              label="Za policajca"
              source="isForPoliceman"
              defaultValue
            />
          </Grid>
        </Grid>
      </SimpleForm>
    </Create>
  );
};
