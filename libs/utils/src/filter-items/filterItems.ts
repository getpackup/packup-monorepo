import { PackingListFilterOptions } from '../enum/enums'
import { PackingListItemType } from '../packingListItem/packingListItem'

// Filter items by labels and whether it has been packed or not
// If the packingFilter is All, just return all the items filtered by labels (if any are selected)
const filterItems = (
  items: Array<PackingListItemType>,
  labelFilters: Array<string>,
  packingFilter: PackingListFilterOptions
): Array<PackingListItemType> =>
  items.filter((item: PackingListItemType) => {
    if (packingFilter === PackingListFilterOptions.Packed) {
      if (labelFilters?.length > 0) {
        const itemLabels = Object.keys(item.labels ?? [])
        const matchedLabels = itemLabels.filter(
          (label) => labelFilters.includes(label) && item.isPacked
        )

        return matchedLabels.length > 0
      }

      return item.isPacked
    }

    if (packingFilter === PackingListFilterOptions.Unpacked) {
      if (labelFilters?.length > 0) {
        const itemLabels = Object.keys(item.labels ?? [])
        const matchedLabels = itemLabels.filter(
          (label) => labelFilters.includes(label) && !item.isPacked
        )

        return matchedLabels.length > 0
      }

      return !item.isPacked
    }

    if (labelFilters?.length > 0) {
      const itemLabels = Object.keys(item.labels ?? [])
      const matchedLabels = itemLabels.filter((label) => labelFilters.includes(label))

      return matchedLabels.length > 0
    }

    return true
  })

export default filterItems
