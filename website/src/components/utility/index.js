export function closeOrStillOpenDropdown($evt, id) {
  let goingTo = $evt.toElement || $evt.relatedTarget;
  return id.length === 1? 
    (
      goingTo.closest('#'+id[0])? true : false
    ) : (
      (
        goingTo.closest('#'+id[0]) || goingTo.closest('#'+id[1])
      )?
      true : false
    );
}
