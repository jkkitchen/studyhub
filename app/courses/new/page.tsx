import CourseForm from '@/components/CourseForm';

export default function NewCoursePage() {
  // Page Content
return (
  <main className='mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-10'>
    {/* Page heading */}
    <div>
      <h1 className='text-2xl font-bold tracking-tight text-dark-text sm:text-3xl'>
        Create Course
      </h1>
      <p className='mt-2 text-sm text-muted sm:text-base'>
        Add a new course to organize your assignments and resources.
      </p>
    </div>

    {/* Course form */}
    <div className='mx-auto w-full max-w-2xl rounded-2xl border border-stone-200 bg-surface p-6 shadow-sm sm:p-8'>
      <CourseForm />
    </div>
  </main>
);
}
