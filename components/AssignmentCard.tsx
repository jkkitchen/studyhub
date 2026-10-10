import type { IAssignment } from '@/models/Assignment';
import Link from 'next/link';

interface AssignmentCardProps {
  assignment: IAssignment;
  courseCode: string; //This way we can pull the course code from the allCourses variable on the dashboard page and have it display in the assignment card
  showStatus?: boolean; //Allows us to choose whether or not the card displays complete/incomplete
}

//NOTE: Will need to update Course Name and Due Date once the two Course models are resolved and merged
export default function AssignmentCard({
  assignment,
  courseCode,
  showStatus = false, //Set default to not show status
}: AssignmentCardProps) {
  const dueDate = assignment.dueDate;
  const formattedDueDate = dueDate
    ? dueDate.toLocaleDateString(undefined, { timeZone: 'UTC' })
    : 'No due date';

  let dueStatus: 'soon' | 'late' | 'tooLate' | null = null;
  if (dueDate && !assignment.completed) {
    const dueDay = Date.UTC(
      dueDate.getUTCFullYear(),
      dueDate.getUTCMonth(),
      dueDate.getUTCDate()
    );
    const now = new Date();
    const today = Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate()
    );
    const daysUntilDue = Math.round((dueDay - today) / 86_400_000);

    if (daysUntilDue < -7) {
      dueStatus = 'tooLate';
    } else if (daysUntilDue < 0) {
      dueStatus = 'late';
    } else if (daysUntilDue <= 3) {
      dueStatus = 'soon';
    }
  }

  const statusStyles = {
    soon: {
      card: 'border-amber-300 border-l-amber-500 bg-surface',
      dot: 'bg-amber-500',
      badge: 'bg-amber-100 text-amber-800',
      label: 'Due soon',
    },
    late: {
      card: 'border-red-200 border-l-danger bg-red-50',
      dot: 'bg-danger',
      badge: 'bg-danger-light text-danger',
      label: 'Late',
    },
    tooLate: {
      card: 'border-red-700 border-l-red-800 bg-red-50',
      dot: 'bg-red-800',
      badge: 'bg-red-800 text-white',
      label: 'Too late',
    },
  } as const;
  const urgency = dueStatus ? statusStyles[dueStatus] : null;

  return (
    <Link
      href={`/assignments/${assignment._id.toString()}`}
      className={`flex items-center justify-between gap-4 rounded-2xl border-2 border-l-6 p-5 shadow-sm transition-shadow hover:shadow-md ${
        urgency?.card ??
        (showStatus && assignment.completed
          ? 'border-stone-200 border-l-emerald-600 bg-surface'
          : 'border-stone-200 border-l-primary bg-surface')
      }`}
    >
      <div className='flex items-center gap-4'>
        <span
          aria-hidden='true'
          className={`h-2.5 w-2.5 shrink-0 rounded-full ${urgency?.dot ?? 'bg-primary'}`}
        />

        <div>
          <p className='font-semibold text-dark-text'>{assignment.title}</p>

          <p className='text-sm text-muted'>{courseCode}</p>

          {showStatus && (
            <p className='text-sm text-muted'>
              Status: {assignment.completed ? 'Completed' : 'Not Completed'}
            </p>
          )}
        </div>
      </div>

      <span
        className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${
          urgency?.badge ?? 'bg-primary-light text-primary-hover'
        }`}
      >
        {urgency ? `${urgency.label} · ${formattedDueDate}` : formattedDueDate}
      </span>
    </Link>
  );
}
