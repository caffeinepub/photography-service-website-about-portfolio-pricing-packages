import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  var nextInquiryId = 0;
  let inquiries = Map.empty<Nat, Inquiry>();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let userProfiles = Map.empty<Principal, UserProfile>();

  type Inquiry = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
    timestamp : Int;
  };

  public type UserProfile = {
    name : Text;
  };

  // Public endpoint for guests to submit inquiries
  public shared ({ caller }) func saveInquiry(name : Text, email : Text, phone : Text, message : Text, timestamp : Int) : async Nat {
    let id = nextInquiryId;
    nextInquiryId += 1;

    let inquiry : Inquiry = {
      id;
      name;
      email;
      phone;
      message;
      timestamp;
    };

    inquiries.add(id, inquiry);
    id;
  };

  // Admin-only: View all inquiries
  public query ({ caller }) func getAllInquiries() : async [Inquiry] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all inquiries");
    };

    inquiries.values().toArray();
  };

  // Admin-only: View specific inquiry
  public query ({ caller }) func getInquiry(id : Nat) : async ?Inquiry {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view inquiries");
    };
    inquiries.get(id);
  };

  // Admin-only: Delete inquiry
  public shared ({ caller }) func deleteInquiry(id : Nat) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete inquiries");
    };

    switch (inquiries.get(id)) {
      case (null) { false };
      case (?_inquiry) {
        inquiries.remove(id);
        true;
      };
    };
  };

  // Admin-only: Clear all inquiries
  public shared ({ caller }) func clearInquiries() : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can clear inquiries");
    };
    inquiries.clear();
  };

  // Users can only check their own role, admins can check any role
  public query ({ caller }) func getUserRole(user : Principal) : async AccessControl.UserRole {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own role");
    };

    AccessControl.getUserRole(accessControlState, user);
  };

  // User profile management functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };
};
