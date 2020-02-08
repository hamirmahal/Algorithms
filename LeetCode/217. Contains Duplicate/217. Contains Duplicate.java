import java.util.HashSet;
import java.util.Set;

class Main {
  public static void main(String[] args) {
    int[] nums = {1,2,3,1};
    System.out.println(containsDuplicate(nums));
  }
  public static boolean containsDuplicate(int[] nums) {
    Set<Integer> uniqueIntegers = new HashSet<>();
    for (int i : nums)
     if (!uniqueIntegers.add(i))
      return true;
    return false;
  }
}