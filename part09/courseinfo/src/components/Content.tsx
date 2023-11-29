import { CoursePart } from '../types';
import Part from './Part';

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = (props: ContentProps) => {
  return (
    <>
      {props.courseParts.map((coursePart, index) => (
        <div key={`${coursePart.name}-${index}`}>
          <p>
            <b>
              {coursePart.name} {coursePart.exerciseCount}
            </b>
            <br />
            <Part coursePart={coursePart} />
          </p>
        </div>
      ))}
    </>
  );
};

export default Content;
