export default function Container({ height, width, children }: { height: number | string; width: number | string; children: any }) {
   return (
      <div
         style={{
            width: width,
            height: height,
         }}
         className="rounded-lg border p-6 dark:border-neutral-700 border-neutral-300  overflow-hidden bg-white dark:bg-neutral-900 "
      >
         {children}
      </div>
   );
}
