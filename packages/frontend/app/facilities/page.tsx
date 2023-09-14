import CrudComponent from '../_components/CrudComponent';

const schema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    name: { type: 'string' },
    address: { type: 'string' },
  },
};

const FacilitiesPage: React.FC = () => {
  return (
      <CrudComponent schema={schema} name="facilities" />
  );
};

export default FacilitiesPage;
