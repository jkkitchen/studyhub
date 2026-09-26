export default function Loading() {
  return (
    <main className='flex min-h-[60vh] items-center justify-center'>
      <div className='text-center'>
        <div
          className='mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900'
          aria-hidden='true'
        />

        <p className='text-lg font-medium'>Loading StudyHub...</p>
        <p className='mt-1 text-sm text-gray-500'>
          Please wait while we load your information.
        </p>
      </div>
    </main>
  );
}
