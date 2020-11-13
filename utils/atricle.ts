
/**
 * 格式化人数
 * @param peopleNumber 人数
 */
export const formatPeople = (peopleNumber: number) => {
  let v = peopleNumber.toString();
  const people = peopleNumber.toString();
  if (people.length > 5) v = people.substr(0, people.length - 4) + '万+';
  return v;
}