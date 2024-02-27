export default function Container({ height, width, children }: { height: number | string; width: number | string; children: any }) {
   return (
      <div
         style={{
            width: width,
            height: height,
         }}
         className="overflow-hidden rounded-xl border border-neutral-300 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-950 "
      >
         {children}
      </div>
   );
}
