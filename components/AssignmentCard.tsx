import type { IAssignment } from '@/models/Assignment';

interface AssignmentCardProps {
  assignment: IAssignment;
}

//NOTE: Will need to update Course Name and Due Date once the two Course models are resolved and merged
export default function AssignmentCard({ assignment }: AssignmentCardProps) {
  //Format the due date for display
    let formattedDueDate;   
  //Becasue due date is optional we need to check if it exists before formatting it
  if (!assignment.dueDate) {
    formattedDueDate = 'No due date';
  } else {
    formattedDueDate = assignment.dueDate.toLocaleDateString();
  }

  return (
    <div className='flex items-center justify-between gap-4 rounded-2xl border-2 border-stone-200 bg-surface p-5 shadow-sm transition-shadow hover:shadow-md'>
      <div className='flex items-center gap-4'>
        <span
          aria-hidden='true'
          className='h-2.5 w-2.5 shrink-0 rounded-full bg-primary'
        />

        <div>
          <p className='font-semibold text-dark-text'>{assignment.title}</p>

          <p className='text-sm text-muted'>Course Name</p>
        </div>
      </div>

      <span className='shrink-0 rounded-full bg-primary-light px-3 py-1.5 text-xs font-semibold text-primary-hover'>
        {formattedDueDate}
      </span>
    </div>
  );
}