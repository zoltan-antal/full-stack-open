import { CoursePart } from '../types';

interface PartProps {
  coursePart: CoursePart;
}

const Part = (props: PartProps) => {
  switch (props.coursePart.kind) {
    case 'basic':
      return <em>{props.coursePart.description}</em>;

    case 'group':
      return <>project exercises {props.coursePart.groupProjectCount}</>;

    case 'background':
      return (
        <>
          <em>{props.coursePart.description}</em>
          <br />
          background at {props.coursePart.backgroundMaterial}
        </>
      );

    case 'special':
      return (
        <>
          <em>{props.coursePart.description}</em>
          <br />
          required skills: {props.coursePart.requirements.join(', ')}
        </>
      );

    default:
      const _exhaustiveCheck: never = props.coursePart;
      return _exhaustiveCheck;
  }
};

export default Part;
