export function PartitionArray<T>({array, predicate}: {array?: T[], predicate: (item: T) => boolean}): [T[], T[]] {
  if (!array) {
    return [[], []] as [T[], T[]];
  }

  return array.reduce((init, current) => {
    init[predicate(current) ? 0 : 1].push(current);
    return init;
  }, [[], []] as [T[], T[]])
}