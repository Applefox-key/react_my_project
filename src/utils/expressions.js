export const expressionState = (item) => {
  let days = item.exceededSkipsDays;
  let exceededSkipsCount = item.exceededSkipsCount;
  //  if (exceededSkipsCount) return <button className="circle bg-danger" />;
  // if (days > 0) return <button className="circle bg-warning" />;   return <></>;
  let color = "colorBlue";
  if (exceededSkipsCount) color = "colorRed";
  if (days > 0) color = "colorOrange";
  return color;
};
